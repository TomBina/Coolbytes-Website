import { Component, OnInit, OnDestroy } from "@angular/core";
import { FooterService } from "../app/footer.service";

@Component({
    selector: "home-blog-post-loading",
    templateUrl: "./blog-post-loading.component.html",
    styleUrls: ["./blog-post-loading.component.scss"]
})
export class BlogPostLoadingComponent implements OnInit, OnDestroy {
    constructor(private _footerService: FooterService) {

    }

    ngOnInit(): void {
        this._footerService.hide();
    }

    ngOnDestroy(): void {
        this._footerService.show();
    }
}