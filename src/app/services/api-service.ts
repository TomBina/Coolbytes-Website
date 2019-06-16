import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { isPlatformBrowser } from "@angular/common";
import { TransferState } from "@angular/platform-browser";

@Injectable()
export class ApiService {
    protected isBrowser: boolean;

    constructor(protected http: HttpClient, protected authService: AuthService, @Inject(PLATFORM_ID) platformId,
        protected transferState: TransferState) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error("An error occurred:", error.error.message);
        }
        else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }

        return throwError("Something bad happened; please try again later.");
    }
}