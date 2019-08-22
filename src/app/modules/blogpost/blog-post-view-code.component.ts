import { Component, Input } from "@angular/core";
import { ExternalLink } from "../../../app/services/blogpostservice/external-link";

@Component({
    selector: "home-blog-post-view-code",
    template: `
        <div>
            <ng-container *ngIf="message">
                <h2>Get the code</h2>
                <ng-container *ngIf="gitHubLink && sandBoxLink">
                    <p>
                        View all code on GitHub, or use codesandbox to edit and run it.
                    </p>
                </ng-container>
                <ng-container *ngIf="gitHubLink && !sandBoxLink">
                    <p>
                        View all code on GitHub.
                    </p>
                </ng-container>
            </ng-container>
            <a mat-raised-button [href]="gitHubLink" target="_blank" *ngIf="gitHubLink">view on github</a>
            <a mat-raised-button [href]="sandBoxLink" target="_blank" *ngIf="sandBoxLink">edit on codesandbox</a>
        </div>
    `,
    styles: ["a { margin-right:10px; }"]
})
export class BlogPostViewCodeComponent {
    @Input()
    codeLinks: ExternalLink[];

    @Input()
    message;

    findLink(query) {
        let link = this.codeLinks.find(r => r.url.includes(query));

        return link ? link.url : null;
    }

    get sandBoxLink() {
        return this.findLink("codesandbox");
    }

    get gitHubLink() {
        return this.findLink("github.com");
    }
}
