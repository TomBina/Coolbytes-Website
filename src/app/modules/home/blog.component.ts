import { Component, OnInit } from "@angular/core";
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";
import { BlogPostSummary } from '../../services/blogpostservice/blog-post-summary';
import { BlogPostsService } from '../../services/blogpostservice/blog-posts.service';
import { map } from "rxjs/operators";

@Component({
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
    blogPosts: BlogPostViewModel[];
    tag: string;

    constructor(private _blogpostsService: BlogPostsService, private _route: ActivatedRoute, private _titleService: Title) {
        this.tag = this._route.snapshot.paramMap.get("tag");
    }

    ngOnInit(): void {
        this._titleService.setTitle("Cool Bytes");
        this._blogpostsService.getAll(this.tag).pipe(
            map(blogPosts => {
                let blogPostsViewModel: BlogPostViewModel[] = [];

                blogPosts.forEach(blogPost => {
                    let blogPostViewModel = new BlogPostViewModel();
                    blogPostViewModel.blogPost = blogPost;
                    blogPostsViewModel.push(blogPostViewModel);
                });

                return blogPostsViewModel;
            })).subscribe(blogPosts => { this.blogPosts = blogPosts; });
    }
}

export class BlogPostViewModel {
    blogPost: BlogPostSummary;
    cssClass: string = "post";
}