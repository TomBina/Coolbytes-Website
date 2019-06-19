import { Component, Input, OnInit } from "@angular/core";
import { UrlFormatter } from "../../services/url-formatter";

@Component({
    selector: "home-blog-category-component",
    styleUrls: ["./blog-category.component.scss"],
    template: `
        <div class="category">
            <ng-container *ngIf="category">
            <h1>{{category.category}}</h1> <a routerLink="/{{this.formatPath(category.category)}}">see all {{category.blogPosts.length}} posts</a>
            <p><md [value]="category.description"></md></p>
            <div class="posts">
                <div class="post" *ngFor="let blog of category.blogPosts.slice(0,4)">
                    <home-blog-post-intro [blogPost]="blog">
                    </home-blog-post-intro>
                </div>
            </div>
            <a mat-raised-button routerLink="/{{this.formatPath(category.category)}}">see all {{category.blogPosts.length}} posts</a>
            </ng-container>
        </div>
    `
})
export class BlogCategoryComponent {
    @Input()
    category;

    constructor(private _urlFormatter: UrlFormatter) {
    }

    formatPath(category) {
        return this._urlFormatter.format(category);
    }
}