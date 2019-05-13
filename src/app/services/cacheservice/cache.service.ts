import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api-service";

@Injectable({
    providedIn: "root"
})
export class CacheService extends ApiService {
    private _url: string = environment.apiUri + "/cache";

    delete(): Observable<boolean> {
        return this.http.delete<HttpResponse<Object>>(`${this._url}`, { observe: "response" })
            .pipe(
                map(r => r.ok ? true : false)
            );
    }
}