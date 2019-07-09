import { Component, Input, OnInit } from "@angular/core";
import { BlogPostsService } from "src/app/services/blogpostservice/blog-posts.service";
import { BlogPost } from "src/app/services/blogpostservice/blog-post";
import { ImagesService } from "src/app/services/imagesservice/images.service";

@Component({
    selector: "home-blog-post-menu",
    template: `
        <div class="{{menuClass}}">
            <div class="content">
                <h1>{{blogPost.subject}}</h1>
                <p class="post-info">{{blogPost.date | date}} by {{blogPost.author.firstName}}</p>
                <div class="actions">
                    <div class="action" *ngIf="blogPost.externalLinks.length > 0">
                        <h2>View code</h2>
                        <a mat-raised-button href="{{blogPost.externalLinks[0].url}}" target="_blank">view code on github</a>
                    </div>
                    <h2>Share post</h2>
                    <div class="action">
                        <share [shareInfo]="shareInfo"></share>
                    </div>
                </div>
                <h1>{{blogPost.category}}</h1>
                <ul>
                    <li *ngFor="let blog of blogPosts$ | async">
                        <div>
                            <img src="{{imagesService.getUri(blog.image.uriPath)}}" />
                        </div>
                        <div>
                            <a *ngIf="blog.id !== blogPost.id;else current" routerLink="/post/{{blog.id}}/{{blog.subjectUrl}}">{{blog.subject}}</a>
                            <ng-template #current>
                                <span>{{blog.subject}}</span>
                            </ng-template>
                        </div>
                    </li>
                </ul>
                <div class="button hidden"><a mat-fab color="accent" (click)="toggle()"><mat-icon>close</mat-icon></a></div>        
            </div>
        </div>
        <div class="button"><a mat-fab color="accent" (click)="toggle()"><mat-icon>menu</mat-icon></a></div>
    `,
    styleUrls: ["./blog-post-menu.component.scss"]
})
export class BlogPostMenuComponent implements OnInit {
    @Input()
    shareInfo;

    @Input()
    blogPost: BlogPost;

    menuClass = "menu";
    blogPosts$;

    constructor(private _blogPostService: BlogPostsService, public imagesService: ImagesService) {

    }

    ngOnInit(): void {
        this.blogPosts$ = this._blogPostService.getByCategory(this.blogPost.categoryId);
    }

    toggle() {
        if (this.menuClass === "menu") {
            this.menuClass = "menu active";
            return;
        }

        this.menuClass = "menu";
    }
}