import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { BlogPostUpdate } from "../../../../services/blogpostservice/blog-post-update";
import { BlogPostsService } from "../../../../services/blogpostservice/blog-posts.service";
import { ExternalLink } from "../../../../services/blogpostservice/external-link";
import { UpdateBlogPostCommand } from "../../../../services/blogpostservice/update-blog-post-command";
import { CategoriesService } from "../../../../services/categoriesservice/categories.service";
import { Category } from "../../../../services/categoriesservice/category";
import { Image } from "../../../../services/imagesservice/image";
import { ImagesService } from "../../../../services/imagesservice/images.service";
import { BlogPostPreview } from "../previewblog/blog-post-preview";
import { PreviewBlogComponent } from "../previewblog/preview-blog.component";

@Component({
    templateUrl: "./update-blog.component.html",
    styleUrls: ["./update-blog.component.css"]
})
export class UpdateBlogComponent implements OnInit, OnDestroy {
    constructor(
        private _route: ActivatedRoute,
        private _blogPostsService: BlogPostsService,
        private _categoriesService: CategoriesService,
        private _router: Router,
        private _imagesService: ImagesService,
        private _formBuilder: FormBuilder) { }

    form: FormGroup;
    image: Image;
    categories: Category[];
    selectedFileName: string;

    private _id: number;
    private _files: FileList;
    @ViewChild(PreviewBlogComponent, { static: true })
    private _previewBlogComponent: PreviewBlogComponent;
    private _previewObserver: Subscription;

    async ngOnInit(): Promise<void> {
        this.form = this._formBuilder.group({
            subject: ["", [Validators.required, Validators.maxLength(100)]],
            contentIntro: ["", [Validators.required, Validators.maxLength(120)]],
            content: ["", [Validators.required, Validators.maxLength(50000)]],
            tags: ["", Validators.maxLength(500)],
            category: ["", Validators.required],
            externalLinks: this._formBuilder.array([]),
            metaTags: this._formBuilder.array([])
        });

        this._previewObserver = this.form.valueChanges.subscribe(v => {
            this._previewBlogComponent.blogPostPreview
                = new BlogPostPreview(this.form.get("subject").value, this.form.get("contentIntro").value, this.form.get("content").value);
        });

        let blogPostId = parseInt(this._route.snapshot.paramMap.get("id"), 0);
        let blogPost$: Observable<BlogPostUpdate> = this._blogPostsService.getUpdate(blogPostId);
        let currentCategoryId$ = blogPost$.pipe(map(b => b.categoryId));

        blogPost$.subscribe(b => this.updateForm(b));
        this.categories = await this._categoriesService.getAll();
        currentCategoryId$.subscribe(id => this.form.get("category").setValue(id));
    }

    ngOnDestroy(): void {
        if (this._previewObserver) {
            this._previewObserver.unsubscribe();
        }
    }

    addControl(name) {
        let links = this.form.get(name) as FormArray;
        let formGroup = this.createFormGroup(name);
        links.push(formGroup);

        return formGroup;
    }

    createFormGroup(name): FormGroup {
        if (name === "externalLinks") {
            return new FormGroup({
                name: new FormControl("", Validators.maxLength(50)),
                url: new FormControl("", Validators.maxLength(255))
            });
        }
        else if (name === "metaTags") {
            return new FormGroup({
                name: new FormControl("", Validators.maxLength(50)),
                value: new FormControl("", Validators.maxLength(1000))
            });
        }

        throw new Error("name not found");
    }

    onImageSelectedHandler(image: Image) {
        this.form.get("content").setValue(`${this.form.get("content").value}![](${this._imagesService.getUri(image.uriPath)})`);
    }

    updateForm(blogPost: BlogPostUpdate) {
        this._id = blogPost.id;
        this.form.get("subject").setValue(blogPost.subject);
        this.form.get("contentIntro").setValue(blogPost.contentIntro);
        this.form.get("content").setValue(blogPost.content);
        this.image = blogPost.image;

        if (this.image) {
            this.image.uri = this._imagesService.getUri(this.image.uriPath);
        }

        let blogPostTags: string[] = [];
        blogPost.tags.forEach(t => {
            blogPostTags.push(t.name);
        });

        this.form.get("tags").setValue(blogPostTags.join(","));

        if (blogPost.externalLinks && blogPost.externalLinks.length > 0) {
            let externalLinks = blogPost.externalLinks;
            externalLinks.forEach(e => {
                let control = this.addControl("externalLinks");
                control.get("name").setValue(e.name);
                control.get("url").setValue(e.url);
            });
        }
        else {
            this.addControl("externalLinks");
        }

        if (blogPost.metaTags && blogPost.metaTags.length > 0) {
            let metaTags = blogPost.metaTags;
            metaTags.forEach(e => {
                let control = this.addControl("metaTags");
                control.get("name").setValue(e.name);
                control.get("value").setValue(e.value);
            });
        }
        else {
            this.addControl("metaTags");
        }
    }

    onFileChanged(element: HTMLInputElement) {
        this._files = element.files;
        this.selectedFileName = this._files.item(0).name;
    }

    onSubmit(): void {
        if (!this.form.valid) {
            for (let controlName of Object.keys(this.form.controls)) {
                this.form.get(controlName).markAsTouched();
            }
            return;
        }

        let externalLinksControls = (<FormArray>this.form.get("externalLinks")).controls;
        let externalLinks = externalLinksControls.filter(c => c.get("name").value && c.get("url").value).map(c => ({ name: c.get("name").value, url: c.get("url").value }));
        let metaTagsControls = (<FormArray>this.form.get("metaTags")).controls;
        let metaTags = metaTagsControls.filter(c => c.get("name").value && c.get("value").value).map(c => ({ name: c.get("name").value, value: c.get("value").value }));

        let command: UpdateBlogPostCommand = {
            id: this._id,
            subject: this.form.get("subject").value,
            content: this.form.get("content").value,
            contentIntro: this.form.get("contentIntro").value,
            categoryId: this.form.get("category").value,
            externalLinks,
            metaTags
        };

        let tags: string = this.form.get("tags").value;

        if (tags.indexOf(",") !== -1 || tags.length > 0) {
            command.tags = tags.split(",");
        }

        this._blogPostsService.update(command, this._files).subscribe(() => {
            this._router.navigateByUrl("admin/blogs");
        });
    }
}