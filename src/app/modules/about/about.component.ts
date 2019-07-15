import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Author } from "../../services/authorsservice/author";
import { Resume } from "../../services/resumeservice/resume";
import { ResumeService } from "../../services/resumeservice/resume.service";
import { Subscription } from "rxjs";
import { SeoService } from "../../services/seoservice/seo.service";

@Component({ templateUrl: "./about.component.html", styleUrls: ["./about.component.scss"] })
export class AboutComponent implements OnInit, OnDestroy {
    resumeEvents;
    years: string[];
    author: Author;
    _resumeSubscription: Subscription;

    constructor(private _resumeService: ResumeService, private _seoService: SeoService) { }

    ngOnInit() {
        this._seoService.setTitle("About Cool Bytes");
        this._seoService.setDescription(`Cool bytes is an open source platform for learning full stack development using frameworks like React, Angular and .Net Core.`);
        this._resumeSubscription = this._resumeService.get(41).subscribe(resume => this.updateTemplate(resume));
    }

    ngOnDestroy(): void {
        this._resumeSubscription.unsubscribe();
    }

    updateTemplate(resume: Resume) {
        this.author = resume.author;
        this.resumeEvents = resume.resumeEvents;

        let years = [];

        for (let year of Object.keys(this.resumeEvents)) {
            years.push(year);
        }

        this.years = years.sort();
    }
}