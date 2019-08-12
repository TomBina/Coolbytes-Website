import { Component, Input } from "@angular/core";
import { BlogPost } from "../../services/blogpostservice/blog-post";

@Component({
    selector: "home-blog-post-menu",
    template: `
        <div class="{{menuClass}}">
            <div class="content">
                <h1>{{blogPost.subject}}</h1>
                <p class="post-info">{{blogPost.date | date}} by {{blogPost.author.firstName}}</p>
                <home-blog-post-view-code [codeLinks]="blogPost.codeLinks"></home-blog-post-view-code>
                <h2>Share this post</h2>
                <share [shareInfo]="shareInfo"></share>
                <home-blog-post-related [blogPost]="blogPost" [blogPosts]="blogPosts"></home-blog-post-related>
                <div class="button hidden"><a mat-fab color="accent" (click)="toggle()"><mat-icon>close</mat-icon></a></div>        
            </div>
        </div>
        <div class="button"><a mat-fab color="accent" (click)="toggle()"><mat-icon>menu</mat-icon></a></div>
    `,
    styleUrls: ["./blog-post-menu.component.scss"]
})
export class BlogPostMenuComponent {
    @Input()
    shareInfo;

    @Input()
    blogPost: any;

    @Input()
    blogPosts: any;

    menuClass = "menu";

    toggle() {
        if (this.menuClass === "menu") {
            this.menuClass = "menu active";
            return;
        }

        this.menuClass = "menu";
    }
}