import { Component, Input } from "@angular/core";
import { BlogPost } from "../../services/blogpostservice/blog-post";

@Component({
    selector: "home-blog-post-menu",
    template: `
        <div class="{{menuClass}}">
            <div class="content">
                <h1>{{blogPost.subject}}</h1>
                <p class="post-info">{{blogPost.date | date}} by {{blogPost.author.firstName}}</p>
                <div class="actions">
                    <div class="action" *ngIf="gitHubLink">
                        <h2>Code</h2>
                        <a mat-raised-button [href]="gitHubLink" target="_blank">view code on github</a>
                    </div>
                    <h2>Share post</h2>
                    <div class="action">
                        <share [shareInfo]="shareInfo"></share>
                    </div>
                </div>
                <home-blog-post-related [blogPost]="blogPost"></home-blog-post-related>
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
    blogPost: BlogPost;

    get gitHubLink() {
        if (this.blogPost.externalLinks.length === 0) {
            return null;
        }

        let link = this.blogPost.externalLinks.find(r => r.url.includes("github"));

        return (link ? link.url : null);
    }

    menuClass = "menu";

    toggle() {
        if (this.menuClass === "menu") {
            this.menuClass = "menu active";
            return;
        }

        this.menuClass = "menu";
    }
}