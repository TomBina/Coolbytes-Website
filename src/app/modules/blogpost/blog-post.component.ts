import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { UrlFormatter } from "../../../app/services/url-formatter";
import { environment } from "../../../environments/environment";
import { BlogPostsService } from "../../services/blogpostservice/blog-posts.service";
import { ImagesService } from "../../services/imagesservice/images.service";
import { SeoService } from "../../services/seoservice/seo.service";
import { isPlatformBrowser } from "@angular/common";
import { BlogPost } from "../../services/blogpostservice/blog-post";

@Component({
    templateUrl: "./blog-post.component.html",
    styleUrls: ["blog-post.component.scss"]
})
export class BlogPostComponent implements OnInit, OnDestroy {
    blogPost;
    blogPosts: BlogPost[];
    authorImage: string;
    shareInfo;

    private _blogPostSubscription: any;
    private _onRouteChanges: Subscription;
    private _isBrowser: boolean;

    constructor(
        private _blogPostsService: BlogPostsService,
        private _route: ActivatedRoute,
        private _imagesService: ImagesService,
        private _seoService: SeoService,
        private _urlFormatter: UrlFormatter,
        @Inject(PLATFORM_ID) platformId
    ) {
        this._isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit(): void {
        this._onRouteChanges = this._route.params.subscribe(changes => {
            if (this._blogPostSubscription) {
                this._blogPostSubscription.unsubscribe();
            }

            this.blogPost = null;
            this._blogPostSubscription = this._blogPostsService.getById(changes.id).subscribe(async b => {
                this.blogPosts = await this._blogPostsService.getByCategory(b.categoryId);

                this.proccesData(b);
            });
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
        let metaTag = name => {
            let tag = blogPost.metaTags.find(m => m.name === name);
            return (tag && tag.value) || null;
        };

        this._seoService.setTitle(title);
        this._seoService.setAuthor(metaTag("author") || `${blogPost.author.firstName} ${blogPost.author.lastName}`);
        this._seoService.setDescription(metaTag("description") || blogPost.contentIntro);
        this._seoService.setTwitter({
            title: metaTag("twitter:title") || title,
            description: metaTag("twitter:description") || blogPost.contentIntro,
            image: metaTag("twitter:image") || image,
            cardType: metaTag("twitter:card") || "summary_large_image",
            site: metaTag("twitter:site") || "@coolbytesio",
            creator: metaTag("twitter:creator") || "@coolbytesio"
        });
        this._seoService.setFacebook({
            title: metaTag("og:title") || title,
            description: metaTag("og:description") || blogPost.contentIntro,
            image: metaTag("og:image") || image,
            url: metaTag("og:url") || url
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
            imageUrl: image,
            get codeLinks() {
                if (!blogPost.externalLinks) {
                    return [];
                }

                return blogPost.externalLinks.filter(r => r.url.includes("github.com") || r.url.includes("codesandbox.io"));
            }
        };

        let index = this.blogPosts.findIndex(b => b.id === blogPost.id);
        if (index > 0) {
            let prev = this.blogPosts[index - 1];
            this.blogPost.prev = {
                subject: prev.subject,
                url: `/post/${prev.id}/${prev.subjectUrl}`
            };
        }

        if (index < this.blogPosts.length - 1) {
            let next = this.blogPosts[index + 1];
            this.blogPost.next = {
                subject: next.subject,
                url: `/post/${next.id}/${next.subjectUrl}`
            };
        }
    }

    formatPath(category) {
        return this._urlFormatter.format(category);
    }
}
