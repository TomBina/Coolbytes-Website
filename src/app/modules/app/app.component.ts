import { Component } from "@angular/core";
import { AnalyticsService } from "../../services/analyticsservice/analyticsservice";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  constructor(private _analyticsService: AnalyticsService) { }
}