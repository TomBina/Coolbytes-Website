import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CategoriesService } from "src/app/services/categoriesservice/categories.service";

@Component({
    template: `
    <h1 mat-dialog-title>Update category</h1>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-dialog-content>
            <mat-form-field>
                <input formControlName="name" placeholder="name" matInput />
            </mat-form-field>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button type="submit" mat-raised-button color="primary">save</button>
            <button mat-button mat-dialog-close>cancel</button>
        </mat-dialog-actions>
    </form>
    `
})
export class UpdateCategoryComponent implements OnInit {
    form: FormGroup;

    constructor(private _fb: FormBuilder, private _categoriesService: CategoriesService,
        private _dialogRef: MatDialogRef<UpdateCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.form = this._fb.group({
            name: [this.data.name, [Validators.required, Validators.maxLength(50)]]
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            for (let controlName of Object.keys(this.form.controls)) {
                this.form.get(controlName).markAsTouched();
            }
            return;
        }

        let command = {
            id: this.data.id,
            name: this.form.get("name").value
        };
        let subscription = this._categoriesService.update(command).subscribe(() => this._dialogRef.close(true));
    }
}