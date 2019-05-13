import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ApiService } from "../api-service";
import { AddBlogPostCommand } from "./add-blog-post-command";
import { BlogPost } from "./blog-post";
import { BlogPostSummary } from "./blog-post-summary";
import { BlogPostUpdate } from "./blog-post-update";
import { UpdateBlogPostCommand } from "./update-blog-post-command";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class BlogPostsService extends ApiService {
    private _url: string = environment.apiUri + "/blogposts";

    get(id): Observable<BlogPost> {
        let observable = this.http.get<BlogPost>(`${this._url}/${id}`);
        return observable;
    }

    getAll(tag?): Observable<BlogPostSummary[]> {
        let url = tag ? `${this._url}/?tag=${encodeURIComponent(tag)}` : this._url;
        return this.http.get<BlogPostSummary[]>(url);
    }

    add(addBlogPostCommand: AddBlogPostCommand, files: FileList): Observable<BlogPostSummary> {
        let formData = this.createFormData(addBlogPostCommand, files);
        return this.http.post<BlogPostSummary>(this._url, formData);
    }

    getUpdate(id) {
        return this.http.get<BlogPostUpdate>(`${this._url}/update/${id}`);
    }

    update(updateBlogPostCommand: UpdateBlogPostCommand, files: FileList): Observable<BlogPostSummary> {
        let formData = this.createFormData(updateBlogPostCommand, files);
        formData.append("id", updateBlogPostCommand.id.toString());
        return this.http.put<BlogPostSummary>(`${this._url}/update/`, formData);
    }

    delete(id) {
        return this.http.delete(`${this._url}/${id}`).pipe(catchError(this.handleError));
    }

    private createFormData(model, files: FileList): FormData {
        let formData = new FormData();
        let file = files && files.length > 0 ? files[0] : null;

        formData.append("subject", model.subject);
        formData.append("contentIntro", model.contentIntro);
        formData.append("content", model.content);

        if (model.tags) {
            model.tags.forEach(t => formData.append("tags", t));
        }

        formData.append("categoryid", model.categoryId);

        if (model.externalLinks) {
            formData.append("externalLinks", JSON.stringify(model.externalLinks));
        }

        if (file) {
            formData.append("file", file, file.name);
        }

        return formData;
    }
}