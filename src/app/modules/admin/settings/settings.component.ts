import { Component, OnInit } from "@angular/core";
import { CacheService } from "../../../services/cacheservice/cache.service";

@Component({ templateUrl: "./settings.component.html" })
export class SettingsComponent {
    invalidateCacheButtonText = "invalidate cache";

    constructor(private _cacheService: CacheService) {
    }


    invalidateCache() {
        this.invalidateCacheButtonText = "invalidating..";
        this._cacheService.delete().subscribe(success => {
            if (success) {
                this.invalidateCacheButtonText = "cache invalidated";
                window.setTimeout(() => this.invalidateCacheButtonText = "invalidate cache", 2000);
            }
            else {
                this.invalidateCacheButtonText = "error!";
                window.setTimeout(() => this.invalidateCacheButtonText = "invalidate cache", 2000);
            }
        });
    }
}