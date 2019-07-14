import { Component, Input } from "@angular/core";
import { ExternalLink } from "src/app/services/blogpostservice/external-link";

@Component({
    selector: "home-blog-post-view-code",
    template: `
        <div *ngIf="gitHubLink">
            <h2 *ngIf="header">Code</h2>
            <a mat-raised-button [href]="gitHubLink" target="_blank">view code on github</a>
        </div>
    `,
    styleUrls: ["./blog-post-view-code.component.scss"]
})
export class BlogPostViewCodeComponent {
    @Input()
    externalLinks: ExternalLink[];

    @Input()
    header;
    
    get gitHubLink() {
        if (this.externalLinks.length === 0) {
            return null;
        }

        let link = this.externalLinks.find(r => r.url.includes("github"));

        return (link ? link.url : null);
    }
}