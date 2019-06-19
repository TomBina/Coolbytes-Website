import { Component, OnInit } from "@angular/core";
import { FooterService } from "./footer.service";

@Component({
    selector: "app-footer",
    templateUrl: "./footer-component.html",
    styleUrls: ["./footer-component.scss"]
})
export class FooterComponent implements OnInit {
    isOpen = true;

    constructor(private _footerService: FooterService) {
    }

    ngOnInit(): void {
        this._footerService.change.subscribe(isOpen => { this.isOpen = isOpen; });
    }
}