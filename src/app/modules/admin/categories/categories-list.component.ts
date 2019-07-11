import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "../../../../app/services/categoriesservice/categories.service";
import { Category } from "../../../../app/services/categoriesservice/category";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddCategoryComponent } from "./add-category.component";
import { UpdateCategoryComponent } from "./update-category.component";
import { catchError } from "rxjs/operators";

@Component({
    templateUrl: "./categories-list.component.html"
})
export class CategoriesListComponent implements OnInit {
    categories: Category[];
    columnsToDisplay = ["name", "options"];

    constructor(private _categoriesService: CategoriesService, private _snackbar: MatSnackBar,
        private _matDialog: MatDialog) {

    }

    ngOnInit(): void {
        this.refresh();
    }

    async refresh() {
        this.categories = await this._categoriesService.getAll();
    }

    onDrop(event: CdkDragDrop<Category[]>): void {
        moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
        let categoryids = this.categories.map(c => c.id);
        this._categoriesService.sort(categoryids).subscribe(r => {
            this._snackbar.open("Categories sorted.", "", { duration: 1500 });
        });
    }

    add() {
        let dialog = this._matDialog.open(AddCategoryComponent);
        dialog.afterClosed().subscribe(added => {
            if (added) {
                this.refresh();
            }
        });
    }

    update(category: Category) {
        let dialog = this._matDialog.open(UpdateCategoryComponent, { data: category });
        dialog.afterClosed().subscribe(updated => {
            if (updated) {
                this.refresh();
            }
        });
    }

    delete(id: number): void {
        if (confirm("Are you sure?")) {
            this._categoriesService.delete(id).pipe(catchError(this._onDeleteError.bind(this))).subscribe(() => this.refresh());
        }
    }

    _onDeleteError(error: any) {
        this._snackbar.open(`Oops! Delete failed. Error: ${error.error}`);
        return error;
    }
}