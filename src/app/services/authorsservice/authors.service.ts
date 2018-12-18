import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api-service";
import { Author } from "./author";

@Injectable()
export class AuthorsService extends ApiService {
    private _url: string = environment.apiUri + "api/authors/";

    get(): Observable<Author> {
        return this.http.get<Author>(this._url, this.createRequestOptions());
    }

    getWithProfile(): Observable<Author> {
        return this.http.get<Author>(`${this._url}?includeProfile=true`, this.createRequestOptions());
    }

    add(command): Observable<Author> {
        return this.http.post<Author>(this._url, command, this.createRequestOptions());
    }

    update(command): Observable<Author> {
        return this.http.put<Author>(this._url, command, this.createRequestOptions());
    }
}