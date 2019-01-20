import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
    constructor(protected _authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this._authService.isAuthenticated()) {
            return next.handle(req);
        }

        let headers = this._authService.addAuthorizationHeader(req.headers);
        headers = headers.set("X-CACHE-ENABLED", "false");

        let request = req.clone({
            headers: headers
        });

        return next.handle(request);
    }
}