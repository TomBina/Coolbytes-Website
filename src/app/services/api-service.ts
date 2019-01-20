import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { throwError } from "rxjs";

@Injectable()
export class ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
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