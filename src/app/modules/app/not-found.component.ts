import { Component } from "@angular/core";
import { FooterService } from "./footer.service";

@Component({
    styles: [`.page { margin:20px; }`],
    template: `
    <div class="page">
        <h1>Not found</h1>
        <p>This page could not be found.</p>
        <h2>Visit other pages</h2>
        <ul>
            <li><a routerLink="/home">homepage</a></li>
            <li><a routerLink="/about">about</a></li>
            <li><a routerLink="/contact">contact us</a></li>
        </ul>
    </div>
`
})
export class NotFoundComponent {
    constructor(footerService: FooterService) {
        footerService.hide();
    }
}