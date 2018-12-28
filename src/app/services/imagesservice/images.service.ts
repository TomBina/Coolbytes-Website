import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api-service";
import { Image } from "./image";

@Injectable({
    providedIn: "root"
})
export class ImagesService extends ApiService {
    private _url: string = environment.apiUri + "api/images/";

    getAll(): Observable<Image[]> {
        return this.http.get<Image[]>(this._url, this.createRequestOptions());
    }

    uploadImages(files: FileList): Observable<Image> {
        let formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("Files", files[i], files[i].name);
        }

        return this.http.post<Image>(this._url, formData, this.createRequestOptions());
    }

    delete(imageId: number) {
        return this.http.delete(`${this._url}?id=${imageId}`, this.createRequestOptions());
    }

    getUri(uriPath: string) {
        if (!uriPath) {
            return;
        }

        let length = environment.imagesUri.length;
        return environment.imagesUri.substring(0, --length) + uriPath;
    }
}