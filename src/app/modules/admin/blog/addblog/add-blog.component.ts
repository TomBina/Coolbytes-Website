import { ImagesService } from "../../../../services/imagesservice/images.service";
import { Image } from "../../../../services/imagesservice/image";
import { AddBlogPostCommand } from "../../../../services/blogpostservice/add-blog-post-command";
import { BlogPostsService } from "../../../../services/blogpostservice/blog-posts.service";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";

import { BlogPostPreview } from "../previewblog/blog-post-preview";
import { PreviewBlogComponent } from "../previewblog/preview-blog.component";
import { Category } from "../../../../services/categoriesservice/category";
import { CategoriesService } from "../../../../../app/services/categoriesservice/categories.service";

@Component({
    templateUrl: "./add-blog.component.html",
    styleUrls: ["./add-blog.component.css"]
})
export class AddBlogComponent implements OnInit, OnDestroy {
    constructor(private _blogPostsService: BlogPostsService,
        private _router: Router, private _fb: FormBuilder,
        private _imagesService: ImagesService, private _categoriesService: CategoriesService) { }

    form: FormGroup;
    externalLinks = [];
    categories: Category[];
    selectedFileName: string;

    @ViewChild(PreviewBlogComponent, { static: true })
    private _previewBlogComponent: PreviewBlogComponent;
    private _previewObserver: Subscription;
    private _files: FileList;

    async ngOnInit() {
        this.form = this._fb.group(
            {
                subject: ["", [Validators.required, Validators.maxLength(100)]],
                contentIntro: ["", [Validators.required, Validators.maxLength(120)]],
                content: ["", [Validators.required, Validators.maxLength(50000)]],
                tags: ["", [Validators.maxLength(500)]],
                category: ["", [Validators.required]],
                externalLinks: this._fb.array([this.createFormGroup("externalLinks")]),
                metaTags: this._fb.array([this.createFormGroup("metaTags")])
            }
        );
        this.categories = await this._categoriesService.getAll();
        this._previewObserver = this.form.valueChanges.subscribe(v => {
            this._previewBlogComponent.blogPostPreview
                = new BlogPostPreview(this.form.get("subject").value,
                    this.form.get("contentIntro").value,
                    this.form.get("content").value);
        });
    }

    ngOnDestroy(): void {
        if (this._previewObserver) {
            this._previewObserver.unsubscribe();
        }
    }

    addControl(name) {
        let links = this.form.get(name) as FormArray;
        links.push(this.createFormGroup(name));
    }

    getFormArray(name) {
        return this.form.get(name) as FormArray;
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

        let command: AddBlogPostCommand = {
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

        this._blogPostsService.add(command, this._files).subscribe(() => this._router.navigateByUrl("admin/blogs"));
    }
}