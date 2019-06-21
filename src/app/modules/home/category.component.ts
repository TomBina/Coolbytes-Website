import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogPostsService } from "../../services/blogpostservice/blog-posts.service";
import { CategoriesService } from "../../services/categoriesservice/categories.service";
import { UrlFormatter } from "../../services/url-formatter";

@Component({
    selector: "home-category-component",
    styleUrls: ["./category.component.scss"],
    template: `
        <ng-container *ngIf="!category">
            <home-blog-loading></home-blog-loading>
        </ng-container>
        <ng-container *ngIf="category">
            <div class="page">
                <h1>{{category.category}}</h1>
                <p><md [value]="category.description"></md></p>
                <div class="posts">
                    <div class="post" *ngFor="let blog of category.blogPosts">
                        <home-blog-post-intro [blogPost]="blog">
                        </home-blog-post-intro>
                    </div>
                </div>
            </div>
        </ng-container>
    `
})
export class CategoryComponent implements OnInit {
    category;

    constructor(private _urlFormatter: UrlFormatter,
        private _categoriesService: CategoriesService,
        private _blogPostsService: BlogPostsService,
        private _route: ActivatedRoute,
        private _router: Router) {
    }

    formatPath(category) {
        return this._urlFormatter.format(category);
    }

    async ngOnInit(): Promise<void> {
        let categoryName = this._urlFormatter.unformat(this._route.snapshot.paramMap.get("category"));
        let category = await this._categoriesService.getByName(categoryName);

        if (!category) {
            this._router.navigateByUrl("/404");
            return;
        }

        let blogPosts = await this._blogPostsService.getByCategory(category.id);
        this.category = {
            category: category.name,
            description: category.description,
            blogPosts: blogPosts
        };
    }
}