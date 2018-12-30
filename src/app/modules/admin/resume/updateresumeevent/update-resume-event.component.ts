import { ResumeEvent } from "../../../../services/resumeservice/resume-event";
import { ResumeEventsService } from "../../../../services/resumeservice/resume-events.service";
import { DateRange } from "../../../../services/resumeservice/date-range";
import { UpdateResumeEventCommand } from "../../../../services/resumeservice/update-resume-event-command";
import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { PreviewResumeEvent } from "../previewresumeevent/preview-resume-event";
import { PreviewResumeEventComponent } from "../previewresumeevent/preview-resume-event.component";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "./update-resume-event.component.html",
    styleUrls: ["./update-resume-event.component.css"]
})
export class UpdateResumeEventComponent implements OnInit {
    form: FormGroup;

    @ViewChild(PreviewResumeEventComponent)
    private _previewResumeEvent: PreviewResumeEventComponent;
    private _previewObserver: Subscription;
    private _id: number;

    constructor(private _fb: FormBuilder, private _resumeService: ResumeEventsService,
        private _router: Router, private _route: ActivatedRoute) {

    }

    ngOnInit() {
        this.form = this._fb.group({
            startDate: ["", [Validators.required]],
            endDate: ["", [Validators.required]],
            name: ["", [Validators.required, Validators.maxLength(50)]],
            message: ["", [Validators.required, Validators.maxLength(1000)]]
        });

        this._previewObserver = this.form.valueChanges.subscribe(v => {
            let previewResumeEvent = {
                startDate : this.form.get("startDate").value,
                endDate : this.form.get("endDate").value,
                name : this.form.get("name").value,
                message : this.form.get("message").value
            }

            this._previewResumeEvent.previewResumeEvent = previewResumeEvent;
        });

        let id: number = parseInt(this._route.snapshot.paramMap.get("id"), 0);
        this._resumeService.get(id).subscribe(resumeEvent => {
            this._id = resumeEvent.id;
            this.updateForm(resumeEvent);
        });
    }

    formatDate(jsonDate: string) {
        let date = new Date(jsonDate);

        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    }
    updateForm(resumeEvent: ResumeEvent) {
        this.form.get("startDate").setValue(this.formatDate(resumeEvent.dateRange.startDate));
        this.form.get("endDate").setValue(this.formatDate(resumeEvent.dateRange.endDate));
        this.form.get("name").setValue(resumeEvent.name);
        this.form.get("message").setValue(resumeEvent.message);
    }

    ngOnDestroy(): void {
        if (this._previewObserver) {
            this._previewObserver.unsubscribe();
        }
    }

    growTextarea(element: HTMLTextAreaElement) {
        element.style.height = `${element.scrollHeight + 2}px`;
    }

    onSubmit() {
        if (!this.form.valid) {
            for (let controlName of Object.keys(this.form.controls)) {
                this.form.get(controlName).markAsTouched();
            }
            return;
        }

        let dateRange: DateRange = {
            startDate: this.form.get("startDate").value,
            endDate: this.form.get("endDate").value
        };

        let updateResumeEventCommand: UpdateResumeEventCommand = {
            id: this._id,
            dateRange: dateRange,
            name: this.form.get("name").value,
            message: this.form.get("message").value
        };


        this._resumeService.update(updateResumeEventCommand).subscribe(r => this._router.navigateByUrl("admin/resume"));
    }
}