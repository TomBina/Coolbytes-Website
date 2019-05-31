import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UrlFormatter {
    format(pathString: string) {
        pathString = pathString.toLowerCase().replace(/\s/g, "-");
        return pathString;
    }

    unformat(pathString) {
        pathString = pathString.toLowerCase().replace(/-/g, " ");
        return pathString;
    }
}