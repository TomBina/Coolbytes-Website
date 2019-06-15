import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SeoService } from "../../../services/seoservice/seo.service";
import { ContactService } from "../../../services/contactservice/contact.service";

@Component({
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
    form: FormGroup;
    isMessageSent: boolean;

    get messageSent() {
        return this.isMessageSent;
    }

    set messageSent(value: boolean) {
        this.isMessageSent = value;
        for (let controlName of Object.keys(this.form.controls)) {
            this.form.get(controlName).markAsUntouched();
            this.form.get(controlName).setValue("");
        }
        return;
    }

    constructor(private _fb: FormBuilder, private _contactService: ContactService, private _seoService: SeoService) {
    }

    ngOnInit() {
        this._seoService.setTitle("Contact Cool Bytes");
        this._seoService.setDescription(`If you have any questions or need support, please fill in our contact form.`);
        this.form = this._fb.group({
            name: ["", Validators.required],
            email: ["", Validators.required],
            message: ["", [Validators.required, Validators.maxLength(2000)]]
        });
    }

    onSubmit() {
        let controls = this.form.controls;

        if (!this.form.valid) {
            for (let controlName of Object.keys(controls)) {
                this.form.get(controlName).markAsTouched();
            }
            return;
        }

        let command: any = {};

        for (let controlName in controls) {
            if (controls[controlName].value && controls[controlName].value.length > 0) {
                command[controlName] = controls[controlName].value;
            }
        }

        this._contactService.Send(command).subscribe(response => {
            this.isMessageSent = true;
        });
    }
}