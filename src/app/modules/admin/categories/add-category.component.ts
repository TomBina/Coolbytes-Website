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
            name: ["", [Validators.required, Validators.maxLength(50)]]
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            for (let controlName of Object.keys(this.form.controls)) {
                this.form.get(controlName).markAsTouched();
            }
            return;
        }

        let name = this.form.get("name").value;
        let subscription = this._categoriesService.add(name).subscribe(() => this._dialogRef.close(true));
    }
}