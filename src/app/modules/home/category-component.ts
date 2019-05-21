import { Component, Input } from "@angular/core";

@Component({
    selector: "category-component",
    styleUrls: ["./category-component.scss"],
    template: `
        <div class="category">
            <h1>{{category.category}}</h1> - {{category.blogPosts.length}} posts
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

    constructor() {
    }
}