import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CategoriesService } from "../../../../app/services/categoriesservice/categories.service";

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
            description: ["", [Validators.required, Validators.maxLength(1000)]],
            isCourse: [""]
        
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
            description: this.form.get("description").value,
            isCourse: this.form.get("isCourse").value || false
        };

        await this._categoriesService.add(command);
        this._dialogRef.close(true);
    }
}