import { HttpHeaders } from "@angular/common/http";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import * as auth0 from "auth0-js";
import { environment } from "../../environments/environment";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private _auth0;
    private _isBrowser: boolean;

    constructor(private _router: Router, @Inject(PLATFORM_ID) platformId) {
        this._isBrowser = isPlatformBrowser(platformId);
        this._auth0 = new auth0.WebAuth({
            clientID: "1172o11AfEVrHK8QTiqwixHdlTD2nwvA",
            domain: "coolbytes.auth0.com",
            responseType: "token id_token",
            audience: environment.apiUri + "/",
            redirectUri: environment.appUri + "admin/processauth",
            scope: "openid email admin"
        });
    }

    public login(): void {
        this._auth0.authorize();
    }

    public handleAuthentication(): void {
        this._auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this._router.navigateByUrl("admin");
            }
            else if (err) {
                this._router.navigateByUrl("");
            }
        });
    }

    private setSession(authResult): void {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
    }

    public logout(): void {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");

        this._router.navigate(["/home"]);
    }

    public isAuthenticated(): boolean {
        if (!this._isBrowser) {
            return false;
        }
        
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    public addAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
        if (localStorage.getItem("access_token")) {
            return headers.set("Authorization", "Bearer " + localStorage.getItem("access_token"));
        }
        else {
            return headers;
        }
    }
}