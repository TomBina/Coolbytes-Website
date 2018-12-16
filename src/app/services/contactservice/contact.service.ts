import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api-service';

@Injectable()
export class ContactService extends ApiService {
    private _url: string = environment.apiUri + "api/contact";
    
    public Send(command) : Observable<Object> {
        return this.http.post(this._url, command);
    }
}