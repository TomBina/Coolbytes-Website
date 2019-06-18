import { Component, Input, OnInit } from "@angular/core";
import { UrlFormatter } from "../../../app/services/url-formatter";
import { CategoriesService } from "../../../app/services/categoriesservice/categories.service";
import { ActivatedRoute } from "@angular/router";
import { BlogPostsService } from "../../../app/services/blogpostservice/blog-posts.service";

@Component({
    selector: "category-component",
    styleUrls: ["./category-component.scss"],
    template: `
        <div class="category">
            <ng-container *ngIf="category">
            <h1>{{category.category}}</h1> <a routerLink="/{{this.formatPath(category.category)}}" *ngIf="!singleCategory">see all {{category.blogPosts.length}} posts</a>
            <p><md [value]="category.description"></md></p>
            <div class="posts">
                <home-blog-post-intro [blogPost]="blog" *ngFor="let blog of blogPosts">
                </home-blog-post-intro>
            </div>
            <a mat-raised-button routerLink="/{{this.formatPath(category.category)}}" *ngIf="!singleCategory">see all {{category.blogPosts.length}} posts</a>
            </ng-container>
        </div>
    `
})
export class CategoryComponent implements OnInit {
    @Input()
    category;
    singleCategory: boolean;
    get blogPosts() {
        if (this.singleCategory) {
            return this.category.blogPosts;
        }
        else {
            return this.category.blogPosts.slice(0,4);
        }
    }

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
        this.singleCategory = true;
        this.category = {
            category: category.name,
            description: category.description,
            blogPosts: blogPosts
        };
    }
}