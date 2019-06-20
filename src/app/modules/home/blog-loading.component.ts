import { Component, OnInit, OnDestroy } from "@angular/core";
import { FooterService } from "../app/footer.service";

@Component({
    selector: "home-blog-loading",
    templateUrl: "./blog-loading.component.html",
    styleUrls: ["./blog-loading.component.scss"]
})
export class BlogLoadingComponent implements OnInit, OnDestroy {
    constructor(private _footerService: FooterService) {

    }

    ngOnInit(): void {
        this._footerService.hide();
    }

    ngOnDestroy(): void {
        this._footerService.show();
    }
}