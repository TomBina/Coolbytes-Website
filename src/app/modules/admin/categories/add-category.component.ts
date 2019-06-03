import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoriesService } from "src/app/services/categoriesservice/categories.service";
import { MatDialogRef } from "@angular/material";

@Component({
    templateUrl: "./add-category.component.html"
})
export class AddCategoryComponent implements OnInit {
    form: FormGroup;

    constructor(private _fb: FormBuilder, private _categoriesService: CategoriesService,
        private _dialogRef: MatDialogRef<AddCategoryComponent>) {

    }

    ngOnInit() {
        this.form = this._fb.group({
            name: ["", [Validators.required, Validators.maxLength(50)]],
            description: ["", [Validators.required, Validators.maxLength(1000)]]
        });
    }

    async onSubmit() {
        if (!this.form.valid) {
            for (let controlName of Object.keys(this.form.controls)) {
                this.form.get(controlName).markAsTouched();
            }
            return;
        }

        let command = {
            name: this.form.get("name").value,
            description: this.form.get("description").value
        };
        await this._categoriesService.add(command);
        this._dialogRef.close(true);
    }
}