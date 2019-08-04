import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { UrlFormatter } from "../../../app/services/url-formatter";
import { environment } from "../../../environments/environment";
import { BlogPostsService } from "../../services/blogpostservice/blog-posts.service";
import { ImagesService } from "../../services/imagesservice/images.service";
import { SeoService } from "../../services/seoservice/seo.service";
import { isPlatformBrowser } from "@angular/common";

@Component({
    templateUrl: "./blog-post.component.html",
    styleUrls: ["blog-post.component.scss"]
})
export class BlogPostComponent implements OnInit, OnDestroy {
    blogPost;
    authorImage: string;
    shareInfo;

    private _blogPostSubscription: any;
    private _onRouteChanges: Subscription;
    private _isBrowser: boolean;

    constructor(private _blogPostsService: BlogPostsService, private _route: ActivatedRoute,
        private _imagesService: ImagesService,
        private _seoService: SeoService,
        private _urlFormatter: UrlFormatter,
        @Inject(PLATFORM_ID) platformId) {
        this._isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit(): void {
        this._onRouteChanges = this._route.params.subscribe(changes => {
            if (this._blogPostSubscription) {
                this._blogPostSubscription.unsubscribe();
            }

            this.blogPost = null;
            this._blogPostSubscription = this._blogPostsService.getById(changes.id).subscribe(b => this.proccesData(b));
        });
    }

    ngOnDestroy(): void {
        if (this._blogPostSubscription) {
            this._blogPostSubscription.unsubscribe();
        }

        this._onRouteChanges.unsubscribe();
    }

    proccesData(blogPost) {
        let title = `${blogPost.subject} - Cool Bytes`;
        let image = this._imagesService.getUri(blogPost.image.uriPath);
        let url = `${environment.appUri}post/${blogPost.id}/${blogPost.subjectUrl}`;

        this._seoService.setTitle(title);
        this._seoService.setAuthor(`${blogPost.author.firstName} ${blogPost.author.lastName}`);
        this._seoService.setDescription(blogPost.contentIntro);
        this._seoService.setTwitter({
            title,
            description: blogPost.contentIntro,
            image,
            cardType: "summary_large_image"
        });
        this._seoService.setFacebook({
            title,
            description: blogPost.contentIntro,
            image,
            url
        });

        if (this._isBrowser) {
            window.scrollTo(0, 0);
        }

        this.shareInfo = {
            url,
            subject: blogPost.subject
        };
        this.authorImage = this._imagesService.getUri(blogPost.author.image.uriPath);
        this.blogPost = {
            ...blogPost,
            get codeLinks() {
                if (!blogPost.externalLinks) {
                    return [];
                }

                return blogPost.externalLinks.filter(r => r.url.includes("github.com") || r.url.includes("codesandbox.io"));
            }
        };
    }

    formatPath(category) {
        return this._urlFormatter.format(category);
    }
}