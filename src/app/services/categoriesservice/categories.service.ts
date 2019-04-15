import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api-service";
import { Category } from "./category";
import { UpdateCategoryCommand } from './update-category-command';

@Injectable({
    providedIn: "root"
})
export class CategoriesService extends ApiService {
    private _url: string = environment.apiUri + "api/categories";

    get(id): Observable<Category> {
        let observable = this.http.get<Category>(`${this._url}/${id}`);
        return observable;
    }

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this._url);
    }

    add(name: string) {
        return this.http.post(this._url, { name: name });
    }

    update(command: UpdateCategoryCommand) {
        return this.http.put(this._url, command);
    }

    delete(id: number) {
        return this.http.delete(`${this._url}/${id}/`);
    }

    sort(ids: Number[]) {
        let sortCategoriesCommand = {
            newSortOrder: ids
        }
        return this.http.put(`${this._url}/sort/`, sortCategoriesCommand, { observe: "response" });
    }
}