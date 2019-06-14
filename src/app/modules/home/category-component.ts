import { Component, Input, OnInit } from "@angular/core";
import { UrlFormatter } from "src/app/services/url-formatter";
import { CategoriesService } from "src/app/services/categoriesservice/categories.service";
import { ActivatedRoute } from "@angular/router";
import { BlogPostsService } from "src/app/services/blogpostservice/blog-posts.service";

@Component({
    selector: "category-component",
    styleUrls: ["./category-component.scss"],
    template: `
        <div class="category">
            <ng-container *ngIf="category">
            <h1><a routerLink="/{{this.formatPath(category.category)}}">{{category.category}}</a></h1> - {{category.blogPosts.length}} posts
            <p><md [value]="category.description"></md></p>
            <div class="posts">
                <home-blog-post-intro [blogPost]="blog" *ngFor="let blog of category.blogPosts">
                </home-blog-post-intro>
            </div>
            </ng-container>
        </div>
    `
})
export class CategoryComponent implements OnInit {
    @Input()
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
        if (this.category) {
            return;
        }

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