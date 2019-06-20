import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlogPostsService } from "../../../app/services/blogpostservice/blog-posts.service";
import { SeoService } from "../../../app/services/seoservice/seo.service";
import { UrlFormatter } from "../../../app/services/url-formatter";

@Component({
    template: `
    <ng-container *ngIf="!tagName">
        <home-blog-loading></home-blog-loading>
    </ng-container>
    <ng-container *ngIf="tagName">
        <div class="page">
            <h1>
                {{tagName}}
            </h1>
            <div class="posts">
                <div class="post" *ngFor="let blog of blogPosts$ | async">
                    <home-blog-post-intro [blogPost]="blog">
                    </home-blog-post-intro>
                </div>
            </div>
        </div>
    </ng-container>`,
    styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
    tag: string;
    blogPosts$: any;
    tagName: string;

    constructor(private _route: ActivatedRoute, private _blogPostsService: BlogPostsService,
        private _seoService: SeoService, urlFormatter: UrlFormatter) {
        let tag: string = urlFormatter.unformat(this._route.snapshot.paramMap.get("tag"));
        tag = `${tag.substring(0, 1).toUpperCase()}${tag.substring(1, tag.length)}`;
        this.tag = tag;
    }

    ngOnInit(): void {
        this.blogPosts$ = this._blogPostsService.getAll(this.tag);
        this.blogPosts$.subscribe(r => {
            if (r.length > 0) {
                this._seoService.setTitle(`Articles tagged with ${this.tag}`);
                this.tagName = this.tag;
                this._seoService.setDescription(`See all articles tagged with ${this.tag}`);
            }
        });
    }
}