import { PreviewResumeEvent } from "../previewresumeevent/preview-resume-event";
import { PreviewResumeEventComponent } from "../previewresumeevent/preview-resume-event.component";
import { DateRange } from "../../../../services/resumeservice/date-range";
import { AddResumeEventCommand } from "../../../../services/resumeservice/add-resume-event-command";
import { ResumeEventsService } from "../../../../services/resumeservice/resume-events.service";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    templateUrl: "./add-resume-event.component.html",
    styleUrls: ["./add-resume-event.component.css"]
})
export class AddResumeEventComponent implements OnInit, OnDestroy {
    form: FormGroup;

    @ViewChild(PreviewResumeEventComponent, { static: true })
    private _previewResumeEvent: PreviewResumeEventComponent;
    private _previewObserver: Subscription;

    constructor(private _fb: FormBuilder, private _resumeService: ResumeEventsService, private _router: Router) {

    }

    ngOnInit() {
        this.form = this._fb.group({
            startDate: ["", [Validators.required]],
            endDate: ["", [Validators.required]],
            name: ["", [Validators.required, Validators.maxLength(50)]],
            message: ["", [Validators.required, Validators.maxLength(1000)]]
        });

        this._previewObserver = this.form.valueChanges.subscribe(v => {
            let previewResumeEvent: PreviewResumeEvent = {
                startDate : this.form.get("startDate").value,
                endDate : this.form.get("endDate").value,
                name : this.form.get("name").value,
                message : this.form.get("message").value
            };

            this._previewResumeEvent.previewResumeEvent = previewResumeEvent;
        });
    }

    ngOnDestroy(): void {
        if (this._previewObserver) {
            this._previewObserver.unsubscribe();
        }
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

        let addResumeEventCommand: AddResumeEventCommand = {
            dateRange: dateRange,
            name: this.form.get("name").value,
            message: this.form.get("message").value
        };

        this._resumeService.add(addResumeEventCommand).subscribe(r => this._router.navigateByUrl("admin/resume"));
    }
}