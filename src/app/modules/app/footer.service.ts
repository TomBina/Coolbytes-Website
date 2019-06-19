import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class FooterService {
    isOpen = true;

    @Output() change: EventEmitter<boolean> = new EventEmitter();

    show() {
        this.isOpen = true;
        this.change.emit(this.isOpen);
    }

    hide() {
        this.isOpen = false;
        this.change.emit(this.isOpen);
    }
}