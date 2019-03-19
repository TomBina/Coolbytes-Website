import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/services/categoriesservice/category";
import { Observable } from "rxjs";
import { CategoriesService } from "src/app/services/categoriesservice/categories.service";

@Component({
    templateUrl: "./categories-list.component.html"
})
export class CategoriesListComponent implements OnInit {
    categories$: Observable<Category[]>;
    columnsToDisplay = ["date", "name", "options"];

    constructor(private _categoriesService: CategoriesService) {

    }

    ngOnInit(): void {
        this.getCategories();
        var x = 1;
    }

    getCategories(): void {
        this.categories$ = this._categoriesService.getAll();
    }

    delete(blogPostId: number): void {
        if (!confirm("Are you sure?")) {
            return;
        }

    }
}