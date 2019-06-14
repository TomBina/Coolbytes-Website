import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class SeoService {
    _tagNames: any[];

    constructor(private _meta: Meta, private _router: Router) {
        this._tagNames = [];
        _router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.cleanTags();
            }
        });
    }

    setAuthor(author) {
        this.setTag("author", author);
    }

    setDescription(description) {
        this.setTag("description", description);
    }

    setTag(name, value) {
        if (!this._meta.getTag(`name="${name}"`)) {
            this._meta.addTag({ name: name, content: value });
            this._tagNames.push(name);
            return;
        }

        this._meta.updateTag({ name: name, content: value });
    }

    cleanTags() {
        for (let tagName of this._tagNames) {
            this._meta.removeTag(`name="${tagName}"`);
        }
    }
}