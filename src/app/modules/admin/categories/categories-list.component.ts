import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "src/app/services/categoriesservice/categories.service";
import { Category } from "src/app/services/categoriesservice/category";
import { MatSnackBar, MatDialog } from "@angular/material";
import { AddCategoryComponent } from './add-category.component';

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

    refresh() {
        this._categoriesService.getAll().subscribe(c => this.categories = c);
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

    delete(id: number): void {
        if (!confirm("Are you sure?")) {
            return;
        }
    }
}