import { Component, Input, OnInit } from "@angular/core";
import { UrlFormatter } from "../../services/url-formatter";
import { CategoriesService } from "../../services/categoriesservice/categories.service";
import { ActivatedRoute } from "@angular/router";
import { BlogPostsService } from "../../services/blogpostservice/blog-posts.service";

@Component({
    selector: "home-category-component",
    styleUrls: ["./category.component.scss"],
    template: `
        <div class="page">
            <ng-container *ngIf="!category">
                <home-blog-loading></home-blog-loading>
            </ng-container>
            <ng-container *ngIf="category">
            <h1>{{category.category}}</h1>
            <p><md [value]="category.description"></md></p>
            <div class="posts">
                <div class="post" *ngFor="let blog of category.blogPosts">
                    <home-blog-post-intro [blogPost]="blog">
                    </home-blog-post-intro>
                </div>
            </div>
            </ng-container>
        </div>
    `
})
export class CategoryComponent implements OnInit {
    category;

    constructor(private _urlFormatter: UrlFormatter,
        private _categoriesService: CategoriesService,
        private _blogPostsService: BlogPostsService,
        private _route: ActivatedRoute) {
    }

    formatPath(category) {
        return this._urlFormatter.format(category);
    }

    async ngOnInit(): Promise<void> {
        let categoryName = this._urlFormatter.unformat(this._route.snapshot.paramMap.get("category"));
        let category = await this._categoriesService.getByName(categoryName);

        if (!category) {
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