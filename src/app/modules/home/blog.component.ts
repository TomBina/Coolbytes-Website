import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SeoService } from "../../services/seoservice/seo.service";
import { BlogPostsService } from "../../services/blogpostservice/blog-posts.service";

@Component({
    templateUrl: "./blog.component.html"
})
export class BlogComponent implements OnInit {
    categories$: Observable<any[]>;
    tag: string;

    constructor(private _blogpostsService: BlogPostsService, private _seoService: SeoService) {
    }

    ngOnInit(): void {
        this._seoService.setTitle("Cool Bytes - Learn more every day.");
        this._seoService.setDescription(`On cool bytes you can learn full stack development using frameworks like React, Angular and .Net Core.`);
        this.categories$ = this._blogpostsService.getOverview().pipe(
            map(overview => (overview.categories.map(c => ({
                    cssClass: "post",
                    ...c
                }))
            ))
        );
    }
}