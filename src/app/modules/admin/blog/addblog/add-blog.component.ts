import { ImagesService } from "../../../../services/imagesservice/images.service";
import { Image } from "../../../../services/imagesservice/image";
import { AddBlogPostCommand } from "../../../../services/blogpostservice/add-blog-post-command";
import { ExternalLink } from "../../../../services/blogpostservice/external-link";
import { BlogPostsService } from "../../../../services/blogpostservice/blog-posts.service";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";

import { BlogPostPreview } from "../previewblog/blog-post-preview";
import { PreviewBlogComponent } from "../previewblog/preview-blog.component";
import { Category } from "../../../../services/categoriesservice/category";
import { CategoriesService } from "src/app/services/categoriesservice/categories.service";

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
    categories$: Observable<Category[]>;

    @ViewChild(PreviewBlogComponent)
    private _previewBlogComponent: PreviewBlogComponent;
    private _previewObserver: Subscription;
    private _files: FileList;

    ngOnInit() {
        this.form = this._fb.group(
            {
                subject: ["", [Validators.required, Validators.maxLength(100)]],
                contentIntro: ["", [Validators.required, Validators.maxLength(120)]],
                content: ["", [Validators.required, Validators.maxLength(4000)]],
                tags: ["", [Validators.maxLength(500)]],
                category: [""],
                externalLinks: this._fb.array([this.createExternalLinkFormGroup()])
            }
        );
        this.categories$ = this._categoriesService.getAll();
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

    growTextarea(element: HTMLTextAreaElement) {
        element.style.height = `${element.scrollHeight + 2}px`;
    }

    getExternalLinksControls(): FormArray {
        return this.form.get("externalLinks") as FormArray;
    }

    addExternalLinkControl() {
        let links = this.getExternalLinksControls();
        links.push(this.createExternalLinkFormGroup());
    }

    createExternalLinkFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl("", Validators.maxLength(50)),
            url: new FormControl("", Validators.maxLength(255))
        });
    }

    onImageSelectedHandler(image: Image) {
        this.form.get("content").setValue(`${this.form.get("content").value}![](${this._imagesService.getUri(image.uriPath)})`);
    }

    onFileChanged(element: HTMLInputElement) {
        this._files = element.files;
    }

    onSubmit(): void {
        if (!this.form.valid) {
            for (let controlName of Object.keys(this.form.controls)) {
                this.form.get(controlName).markAsTouched();
            }
            return;
        }

        let externalLinks: ExternalLink[] = [];
        let controls = this.getExternalLinksControls();
        for (let control of controls.controls) {
            let externalLink = new ExternalLink(control.get("name").value, control.get("url").value);
            if (externalLink.name.length > 0 && externalLink.url.length > 0) {
                externalLinks.push(externalLink);
            }
        }

        let command: AddBlogPostCommand = {
            subject: this.form.get("subject").value,
            content: this.form.get("content").value,
            contentIntro: this.form.get("contentIntro").value,
            categoryId: this.form.get("category").value,
            externalLinks: externalLinks
        };

        let tags: string = this.form.get("tags").value;
        if (tags.indexOf(",") !== -1 || tags.length > 0) {
            command.tags = tags.split(",");
        }

        this._blogPostsService.add(command, this._files).subscribe(() => this._router.navigateByUrl("admin/blogs"));
    }
}