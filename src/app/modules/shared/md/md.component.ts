import { ImagesService } from "../../../services/imagesservice/images.service";
import { Component, OnChanges, Input } from "@angular/core";
import * as marked from "marked";
import * as prism from "../../../../external/prism";
import { getLines, highlightLines } from "../../../../external/prism/highlightlines";
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

            if (href.startsWith("#") || href.startsWith("/")) {
                return `<a class="md-link" href="${href}">${text}</a>`;
            }
            else {
                return `<a class="md-link" href="${href}" target="_blank">${text}</a>`;
            }
        };

        marked.setOptions({
            gfm: true,
            breaks: true,
            renderer: renderer,
            sanitize: true,
            highlight: (c, lang) => {
                let { splitLanguage: language, lines } = getLines(lang);
                let languages = {
                    highlightLines(highlighted) {
                        if (!lines || lines.length === 0) {
                            return highlighted;
                        }

                        let parsedLines: any[] = highlightLines(highlighted, lines);
                        let lastIndex = parsedLines.length - 1;
                        let result = parsedLines.reduce(function (acc, current, index) {
                            let part = current.highlight
                                ? current.code
                                : `${current.code}${index === lastIndex ? `` : `\n`}`;
                            
                                return `${acc}${part}`;
                        }, "");

                        return result;
                    },
                    jsx() {
                        let highlighted = prism.highlight(c, prism.languages.jsx);
                        return this.highlightLines(highlighted);
                    },
                    js() {
                        let highlighted = prism.highlight(c, prism.languages.js);
                        return this.highlightLines(highlighted);
                    },
                    css() {
                        let highlighted = prism.highlight(c, prism.languages.css);
                        return this.highlightLines(highlighted);
                    },
                    csharp() {
                        let highlighted = prism.highlight(c, prism.languages.csharp);
                        return this.highlightLines(highlighted);
                    }
                };

                if (languages[language]) {
                    return languages[language]();
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