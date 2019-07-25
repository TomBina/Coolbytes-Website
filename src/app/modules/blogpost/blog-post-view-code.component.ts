import { Component, Input } from "@angular/core";
import { ExternalLink } from "../../../app/services/blogpostservice/external-link";

@Component({
    selector: "home-blog-post-view-code",
    template: `
        <div *ngIf="gitHubLink || sandBoxLink">
            <ng-container *ngIf="buttons">
                <a mat-raised-button [href]="gitHubLink" target="_blank" *ngIf="gitHubLink">view github</a>
                <a mat-raised-button [href]="sandBoxLink" target="_blank" *ngIf="sandBoxLink">edit/run</a>
            </ng-container>
            <ng-container *ngIf="!buttons">
                <h2>Code</h2>
                <ul>
                    <li><a [href]="gitHubLink" target="_blank" *ngIf="gitHubLink">View source on github</a></li>
                    <li><a [href]="sandBoxLink" target="_blank" *ngIf="sandBoxLink">Edit/run on codesandbox</a></li>
                </ul>
            </ng-container>
        </div>
    `,
    styleUrls: ["./blog-post-view-code.component.scss"]
})
export class BlogPostViewCodeComponent {
    @Input()
    externalLinks: ExternalLink[];

    @Input()
    buttons = true;

    findLink(query) {
        if (this.externalLinks.length === 0) {
            return null;
        }

        let link = this.externalLinks.find(r => r.url.includes(query));

        return (link ? link.url : null);
    }

    get sandBoxLink() {
        return this.findLink("codesandbox");
    }

    get gitHubLink() {
        return this.findLink("github.com");
    }
}