import { AuthorsService } from "../../../services/authorsservice/authors.service";
import { Component, OnInit } from "@angular/core";

import { ResumeEvent } from "../../../services/resumeservice/resume-event";
import { ResumeEventsService } from "../../../services/resumeservice/resume-events.service";
import { Observable } from "rxjs";

@Component({ templateUrl: "./resume-manager.component.html", styleUrls: ["./resume-manager.component.css"] })
export class ResumeManagerComponent implements OnInit {
    resumeEvents$: Observable<ResumeEvent[]>;
    columnsToDisplay = ["date", "name", "options"];

    constructor(private _resumeEventsService: ResumeEventsService, private _authorsService: AuthorsService) {
    }

    ngOnInit(): void {
        this.getResumeEvents();
    }

    getResumeEvents(): void {
        this._authorsService.get().subscribe(author => {
            this.resumeEvents$ = this._resumeEventsService.getAll(author.id);
        });
    }

    delete(resumeEventId: number): void {
        if (!confirm("Are you sure?")) {
            return;
        }

        this._resumeEventsService.delete(resumeEventId).subscribe(response => {
            this.getResumeEvents();
        });
    }
}