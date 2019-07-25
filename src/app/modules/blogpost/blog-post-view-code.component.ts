import { Component, Input } from "@angular/core";
import { ExternalLink } from "../../../app/services/blogpostservice/external-link";

@Component({
    selector: "home-blog-post-view-code",
    template: `
        <div>
            <ng-container *ngIf="!large">
                <a mat-raised-button [href]="gitHubLink" target="_blank" *ngIf="gitHubLink">view github</a>
                <a mat-raised-button [href]="sandBoxLink" target="_blank" *ngIf="sandBoxLink">edit/run</a>
            </ng-container>
            <ng-container *ngIf="large">
                <a mat-raised-button [href]="gitHubLink" target="_blank" *ngIf="gitHubLink">view on github</a>
                <a mat-raised-button [href]="sandBoxLink" target="_blank" *ngIf="sandBoxLink">edit on codesandbox</a>
            </ng-container>
        </div>
    `,
    styleUrls: ["./blog-post-view-code.component.scss"]
})
export class BlogPostViewCodeComponent {
    @Input()
    codeLinks: ExternalLink[];

    @Input()
    large;

    findLink(query) {
        let link = this.codeLinks.find(r => r.url.includes(query));

        return (link ? link.url : null);
    }

    get sandBoxLink() {
        return this.findLink("codesandbox");
    }

    get gitHubLink() {
        return this.findLink("github.com");
    }
}