import { Component, Input, OnChanges } from "@angular/core";

@Component({
    selector: "home-blog-navigation",
    template: `
        <div class="table-row {{className}}">
            <div class="table-col width-50">
                <a *ngIf="blogPost.prev" [routerLink]="blogPost.prev.url">&laquo; previous {{catType}}</a>
            </div>
            <div class="table-col width-50 right">
                <a *ngIf="blogPost.next" [routerLink]="blogPost.next.url">next {{catType}} &raquo;</a>
            </div>
        </div>
    `,
    styleUrls: ["./blog-post-navigation.component.scss"]
})

export class BlogPostNavigationComponent implements OnChanges {
    @Input()
    blogPost;

    @Input()
    className = "nav";

    get catType() {
        if (!this.blogPost) {
            return "";
        }

        return this.blogPost.isCourse ? "lesson" : "post";
    }

    ngOnChanges() {
        
    }
}
