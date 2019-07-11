import { ImagesService } from "../../../services/imagesservice/images.service";
import { Component, OnChanges, Input } from "@angular/core";
import * as marked from "marked";
import * as prism from "../../../../external/prism";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
    selector: "md",
    template: `<div [innerHtml]="html"></div>`
})
export class MdComponent implements OnChanges {
    @Input()
    value: string;
    html: SafeHtml;

    private _marked;

    constructor(_imagesService: ImagesService, private _sanitizer: DomSanitizer, router: Router) {
        let renderer = new marked.Renderer();
        renderer.image = (href: string, title: string, text: string) => {
            if (href.startsWith("/")) {
                return `<img class="md-image" src="${_imagesService.getUri(href)}" />`;
            }
            else {
                return `<img class="md-image" src="${href}" />`;
            }
        };
        renderer.link = (href: string, title: string, text: string) => {
            if (!text && href.startsWith("#")) {
                return `<a name="${href.replace("#", "")}"></a>`;
            }

            if (title == null && href === text) {
                return href;
            }

            if (href.startsWith("#")) {
                href = router.url + href;
            }
            
            return `<a class="md-link" href="${href}">${text}</a>`;
        };

        marked.setOptions({
            gfm: true,
            breaks: true,
            renderer: renderer,
            sanitize: true,

            highlight: (c, lang) => {
                let languages = {
                    jsx() {
                        return prism.highlight(c, prism.languages.jsx);
                    },
                    js() {
                        return prism.highlight(c, prism.languages.js);
                    },
                    css() {
                        return prism.highlight(c, prism.languages.css);
                    }
                };

                if (languages[lang]) {
                    return languages[lang]();
                }
                else {
                    return prism.highlight(c, prism.languages.csharp);
                }
            }
        });
        this._marked = marked;
    }

    ngOnChanges(): void {
        if (this.value) {
            this.html = this._sanitizer.bypassSecurityTrustHtml(this._marked(this.value));
        }
    }
}