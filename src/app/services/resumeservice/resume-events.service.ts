import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api-service';
import { AddResumeEventCommand } from './add-resume-event-command';
import { ResumeEvent } from './resume-event';
import { UpdateResumeEventCommand } from './update-resume-event-command';


@Injectable()
export class ResumeEventsService extends ApiService {
    private _url: string = environment.apiUri + "api/resumeevents";

    getAll(authorId: number): Observable<ResumeEvent[]> {
        return this.http.get<ResumeEvent[]>(`${this._url}/${authorId}/`, this.createRequestOptions());
    }

    get(resumeEventId: number): Observable<ResumeEvent> {
        return this.http.get<ResumeEvent>(`${this._url}/event/${resumeEventId}/`, this.createRequestOptions());
    }

    add(addResumeEventCommand: AddResumeEventCommand): Observable<ResumeEvent> {
        return this.http.post<ResumeEvent>(this._url, addResumeEventCommand, this.createRequestOptions());
    }

    update(updateResumeEventCommand: UpdateResumeEventCommand): Observable<ResumeEvent> {
        return this.http.put<ResumeEvent>(this._url, updateResumeEventCommand, this.createRequestOptions());
    }

    delete(resumeEventId: number): Observable<Object> {
        return this.http.delete(`${this._url}/${resumeEventId}/`, this.createRequestOptions());
    }
}