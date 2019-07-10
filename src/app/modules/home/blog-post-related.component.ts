import { Component, OnInit, Input } from "@angular/core";
import { BlogPostsService } from "../../services/blogpostservice/blog-posts.service";
import { ImagesService } from "../../services/imagesservice/images.service";
import { BlogPost } from "../../services/blogpostservice/blog-post";

@Component({
    selector: "home-blog-post-related",
    template: `<h2>{{blogPost.category}}</h2>
               <ul>
                    <li *ngFor="let blog of blogPosts$ | async">
                        <div>
                            <a routerLink="/post/{{blog.id}}/{{blog.subjectUrl}}">
                                <img src="{{imagesService.getUri(blog.image.uriPath)}}" />
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
export class BlogPostRelatedComponent implements OnInit {
    @Input()
    blogPost: BlogPost;

    blogPosts$;

    constructor(private _blogPostService: BlogPostsService, public imagesService: ImagesService) {
    }
    
    ngOnInit(): void {
        this.blogPosts$ = this._blogPostService.getByCategory(this.blogPost.categoryId);
    }
}