import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BlogPostsService } from "../../services/blogpostservice/blog-posts.service";

@Component({
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
    categories$: Observable<any[]>;
    tag: string;

    constructor(private _blogpostsService: BlogPostsService, private _titleService: Title) {
    }

    ngOnInit(): void {
        this._titleService.setTitle("Cool Bytes");
        this.categories$ = this._blogpostsService.getOverview().pipe(
            map(overview => (overview.categories.map(c => ({
                    cssClass: "post",
                    ...c
                }))
            ))
        );
    }
}