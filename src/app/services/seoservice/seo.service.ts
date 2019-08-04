import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class SeoService {
    _tagNames: any[];

    constructor(private _meta: Meta, private _router: Router, private _titleService: Title) {
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

    setTitle(title) {
        this._titleService.setTitle(title);
    }

    setDescription(description) {
        this.setTag("description", description);
    }

    setTwitter({cardType, title, description, image, site, creator}: Twitter) {
        this.setTag("twitter:card", cardType);
        this.setTag("twitter:title", title);
        this.setTag("twitter:description", description);
        this.setTag("twitter:image", image);
        this.setTag("twitter:site", site ? site : "@coolbytesio");
        this.setTag("twitter:creator", creator ? creator : "@coolbytesio");
    }
    
    setFacebook({title, description, image, url}: Facebook) {
        this.setTag("og:title", title);
        this.setTag("og:description", description);
        this.setTag("og:image", image);
        this.setTag("og:url", url);
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

interface Twitter {
    title: String;
    description: String;
    image: String;
    creator?: String;
    site?: String;
    cardType: String;
}

interface Facebook {
    title: String;
    description: String;
    image: String;
    url: String;
}