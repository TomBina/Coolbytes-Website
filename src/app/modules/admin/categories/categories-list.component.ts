import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "src/app/services/categoriesservice/categories.service";
import { Category } from "src/app/services/categoriesservice/category";
import { MatSnackBar } from "@angular/material";

@Component({
    templateUrl: "./categories-list.component.html"
})
export class CategoriesListComponent implements OnInit {
    categories: Category[];
    columnsToDisplay = ["name", "options"];

    constructor(private _categoriesService: CategoriesService, private _snackbar: MatSnackBar) {

    }

    ngOnInit(): void {
        this._categoriesService.getAll().subscribe(c => this.categories = c);
    }

    onDrop(event: CdkDragDrop<Category[]>): void {
        moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
        let categoryids = this.categories.map(c => c.id);
        this._categoriesService.sort(categoryids).subscribe(r => {
            this._snackbar.open("Categories sorted.", "", { duration: 1500 });
        });
    }

    delete(id: number): void {
        if (!confirm("Are you sure?")) {
            return;
        }

    }
}