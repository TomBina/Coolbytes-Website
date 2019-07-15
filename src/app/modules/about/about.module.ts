import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { AboutComponent } from "../about/about.component";
import { AuthorComponent } from "./author/author.component";
import { ResumeEventComponent } from "./resumeevent/resume-event.component";

export const routes: Routes = [
    {
        path: "",
        component: AboutComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [
        AboutComponent,
        AuthorComponent,
        ResumeEventComponent
    ]
})
export class AboutModule {

}