import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/services/categoriesservice/category";
import { Observable } from "rxjs";
import { CategoriesService } from "src/app/services/categoriesservice/categories.service";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
    templateUrl: "./categories-list.component.html"
})
export class CategoriesListComponent implements OnInit {
    categories$: Observable<Category[]>;
    columnsToDisplay = ["name", "options"];

    constructor(private _categoriesService: CategoriesService) {

    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories(): void {
        this.categories$ = this._categoriesService.getAll();
    }

    onDrop(event: CdkDragDrop<Category[]>): void {
    }

    delete(id: number): void {
        if (!confirm("Are you sure?")) {
            return;
        }

    }
}