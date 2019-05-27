import { Component, Input } from "@angular/core";
import { UrlFormatter } from "src/app/services/url-formatter";

@Component({
    selector: "category-component",
    styleUrls: ["./category-component.scss"],
    template: `
        <div class="category">
            <h1><a href="{{this.formatPath(category.category)}}/">{{category.category}}</a></h1> - {{category.blogPosts.length}} posts
            <div class="posts">
                <home-blog-post-intro [blogPost]="blog" *ngFor="let blog of category.blogPosts">
                </home-blog-post-intro>
            </div>
        </div>
    `
})
export class CategoryComponent  {
    @Input()
    category;

    constructor(private _urlFormatter: UrlFormatter) {
    }

    formatPath(category) {
        return this._urlFormatter.format(category);
    }
}