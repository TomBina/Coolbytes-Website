import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BlogPostSummary } from "../../../services/blogpostservice/blog-post-summary";
import { BlogPostsService } from "../../../services/blogpostservice/blog-posts.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    templateUrl: "./blog-list.component.html",
    styleUrls: ["./blog-list.component.css"]
})
export class BlogListComponent implements OnInit {
    blogPosts: BlogPostSummary[];
    columnsToDisplay = ["date", "name", "options"];

    constructor(private _blogPostsService: BlogPostsService, private _snackbar: MatSnackBar) {}

    ngOnInit(): void {
        this.getBlogs();
    }

    onDrop(event: CdkDragDrop<BlogPostSummary[]>): void {
        moveItemInArray(this.blogPosts, event.previousIndex, event.currentIndex);
        let blogPostIds = this.blogPosts.map(c => c.id);
        // this._blogPostsService.sort(blogPostIds).subscribe(r => {
        //     this._snackbar.open("Blog posts sorted.", "", { duration: 1500 });
        // });
    }

    async getBlogs(): Promise<void> {
        this.blogPosts = await this._blogPostsService.getAll().toPromise();
    }

    delete(blogPostId: number): void {
        if (!confirm("Are you sure?")) {
            return;
        }

        this._blogPostsService.delete(blogPostId).subscribe(_ => this.getBlogs());
    }
}
