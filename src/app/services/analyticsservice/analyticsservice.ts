import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

declare var gtag: Function;

@Injectable({
    providedIn: "root"
})
export class AnalyticsService {
    constructor(router: Router, @Inject(PLATFORM_ID) platformId) {
        if (!isPlatformBrowser(platformId) || !environment.production) {
            return;
        }

        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag("config", "UA-142788068-1", {
                    "page_path": event.urlAfterRedirects
                });
            }
        });
    }
}