import { Component, OnInit, Input } from "@angular/core";
import { BlogPostsService } from "../../services/blogpostservice/blog-posts.service";
import { ImagesService } from "../../services/imagesservice/images.service";
import { BlogPost } from "../../services/blogpostservice/blog-post";

@Component({
    selector: "home-blog-post-related",
    template: `<h2>{{blogPost.category}}</h2>
               <ul>
                    <li *ngFor="let blog of blogPosts">
                        <div>
                            <a routerLink="/post/{{blog.id}}/{{blog.subjectUrl}}">
                                <img [attr.data-src]="imagesService.getUri(blog.image.uriPath)" src="/assets/placeholder.svg" appLazyLoad />
                            </a>
                        </div>
                        <div>
                            <a *ngIf="blog.id !== blogPost.id;else current" routerLink="/post/{{blog.id}}/{{blog.subjectUrl}}">{{blog.subject}}</a>
                            <ng-template #current>
                                <span>{{blog.subject}}</span>
                            </ng-template>
                        </div>
                    </li>
                </ul>
                `,
    styleUrls: ["./blog-post-related.component.scss"]
})
export class BlogPostRelatedComponent {
    @Input()
    blogPost: BlogPost;

    @Input()
    blogPosts;

    constructor(private _blogPostService: BlogPostsService, public imagesService: ImagesService) {
    }
}