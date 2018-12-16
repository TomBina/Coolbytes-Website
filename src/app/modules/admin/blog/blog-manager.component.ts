import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { BlogPostSummary } from '../../../services/blogpostservice/blog-post-summary';
import { BlogPostsService } from '../../../services/blogpostservice/blog-posts.service';


@Component({
    templateUrl: "./blog-manager.component.html",
    styleUrls: ["./blog-manager.component.css"]
})
export class BlogManagerComponent implements OnInit {
    blogPosts$: Observable<BlogPostSummary[]>;

    constructor(private _blogPostsService: BlogPostsService) {

    }

    ngOnInit(): void {
        this.getBlogs();
    }

    getBlogs(): void {
        this.blogPosts$ = this._blogPostsService.getAll();
    }

    delete(blogPostId: number): void {
        if (!confirm("Are you sure?"))
            return;

        this._blogPostsService.delete(blogPostId).subscribe(_ => this.getBlogs());
    }
}