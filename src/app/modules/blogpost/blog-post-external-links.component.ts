import { Component, Input } from "@angular/core";
import { ExternalLink } from "../../services/blogpostservice/external-link";

@Component({
    selector: "home-blog-post-external-links",
    template: `
    <div *ngIf="externalLinks?.length > 0">
        <h2>Resources</h2>
        <ul>
            <li *ngFor="let link of externalLinks">
                <a target="_blank" [href]="link.url">{{link.name}}</a>
            </li>
        </ul>
    </div>`,
    styleUrls: ["./blog-post-external-links.component.scss"]
})
export class BlogPostExternalLinksComponent {
    _externalLinks: ExternalLink[];

    @Input()
    set externalLinks(value) {
        this._externalLinks = value;
    }

    get externalLinks(): ExternalLink[] {
        if (!this._externalLinks || this._externalLinks.length === 0) {
            return null;
        }

        return this._externalLinks.filter(r => !r.url.includes("github.com") && !r.url.includes("codesandbox"));
    }
}