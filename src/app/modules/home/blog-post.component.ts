import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BlogPostsService } from '../../services/blogpostservice/blog-posts.service';
import { ImagesService } from '../../services/imagesservice/images.service';

@Component({
    templateUrl: "./blog-post.component.html",
    styleUrls: ["blog-post.component.css"]
})
export class BlogPostComponent implements OnInit, OnDestroy {
    blogPost;
    authorImage: string;
    shareInfo;

    private _blogPostSubscription: any;
    private _onRouteChanges: Subscription;

    constructor(private _blogPostsService: BlogPostsService, private _route: ActivatedRoute, private _imagesService: ImagesService, private _titleService: Title) { }

    ngOnInit(): void {
        this._onRouteChanges = this._route.params.subscribe(changes => {
            if (this._blogPostSubscription)
                this._blogPostSubscription.unsubscribe();
                
            this._blogPostSubscription = this._blogPostsService.get(changes.id).subscribe(b => this.proccesData(b));
        });
    }

    ngOnDestroy(): void {
        if (this._blogPostSubscription)
            this._blogPostSubscription.unsubscribe();
            
        this._onRouteChanges.unsubscribe();
    }

    proccesData(blogPost) {
        this._titleService.setTitle(`${blogPost.subject} - Cool Bytes`);
        window.scrollTo(0, 0);

        this.shareInfo = {
            url: `${environment.appUri}post/${blogPost.id}/${blogPost.subjectUrl}`,
            subject: blogPost.subject
        };

        if (blogPost.relatedLinks) {
            for (let link of blogPost.relatedLinks) {
                link.url = `/post/${link.id}/${link.subjectUrl}`;
            }
        }

        this.authorImage = this._imagesService.getUri(blogPost.author.image.uriPath);
        this.blogPost = blogPost;
    }
}