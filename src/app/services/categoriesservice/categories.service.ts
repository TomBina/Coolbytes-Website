import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api-service";
import { Category } from "./category";
import { UpdateCategoryCommand } from "./update-category-command";
import { makeStateKey } from "@angular/platform-browser";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class CategoriesService extends ApiService {
    private _url: string = environment.apiUri + "/categories";
    private _categoriesCache: Category[];

    get(id): Observable<Category> {
        let observable = this.http.get<Category>(`${this._url}/${id}`);
        return observable;
    }

    async getAll(): Promise<Category[]> {
        let key = makeStateKey(`categoriesservice_getall`);

        if (this.isBrowser) {
            let cached = this.transferState.get(key, null);
            if (cached) {
                return of(cached).toPromise();
            }
        }

        return await this.http.get<Category[]>(this._url).pipe(
            tap(obj => {
                if (!this.isBrowser) {
                    this.transferState.set(key, obj);
                }
            })
        ).toPromise();
    }

    async getByName(name) {
        if (!this._categoriesCache) {
            this._categoriesCache = await this.getAll();
        }

        return this._categoriesCache.find(c => c.name.toLowerCase() === name);
    }

    async add(command) {
        await this.http.post(this._url, command).toPromise();
    }

    async update(command: UpdateCategoryCommand) {
        await this.http.put(this._url, command).toPromise();
    }

    delete(id: number) {
        return this.http.delete(`${this._url}/${id}/`);
    }

    sort(ids: Number[]) {
        let sortCategoriesCommand = {
            newSortOrder: ids
        };

        return this.http.put(`${this._url}/sort/`, sortCategoriesCommand, { observe: "response" });
    }
}