import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BlogPostSummary } from "../../../services/blogpostservice/blog-post-summary";
import { BlogPostsService } from "../../../services/blogpostservice/blog-posts.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "./blog-list.component.html",
    styleUrls: ["./blog-list.component.scss"]
})
export class BlogListComponent implements OnInit {
    allBlogPosts: BlogPostSummary[];
    columnsToDisplay = ["date", "name", "options"];
    categories: any[];
    activeCategory: any;
    activeBlogPosts: BlogPostSummary[];

    constructor(private _blogPostsService: BlogPostsService, private _snackbar: MatSnackBar, private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this.getBlogs();
    }

    onDrop(event: CdkDragDrop<BlogPostSummary[]>): void {
        moveItemInArray(this.activeBlogPosts, event.previousIndex, event.currentIndex);
        let blogPostIds = this.activeBlogPosts.map(c => c.id);

        console.log(blogPostIds);
        this._blogPostsService.sort(this.activeCategory.id, blogPostIds).subscribe(r => {
            this._snackbar.open("Blog posts sorted.", "", { duration: 1500 });
        });
    }

    async getBlogs(): Promise<void> {
        this.allBlogPosts = await this._blogPostsService.getAll().toPromise();
        this.categories = [];
        
        this.allBlogPosts.map(b => ({ name: b.category, id: b.categoryId })).forEach(category => {
            if (!this.categories.some(c => c.id === category.id)) {
                this.categories.push(category);
            }
        }, []);

        let paramCategoryId = parseInt(this._route.snapshot.paramMap.get("id"), 0);
        
        if (paramCategoryId) {
            this.activeCategory = this.categories.find(c => c.id === paramCategoryId);
        }
        else {
            [this.activeCategory] = this.categories;
        }
         
        this.activeBlogPosts = this.allBlogPosts.filter(b => b.categoryId === this.activeCategory.id);

    }

    setActiveCategory(categoryId) {
        this.activeCategory = this.categories.find(c => c.id === categoryId);
        this.activeBlogPosts = this.allBlogPosts.filter(b => b.categoryId === categoryId);
    }

    delete(blogPostId: number): void {
        if (!confirm("Are you sure?")) {
            return;
        }

        this._blogPostsService.delete(blogPostId).subscribe(_ => this.getBlogs());
    }
}
