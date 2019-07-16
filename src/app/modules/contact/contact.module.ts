import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ContactComponent } from "./contact.component";

export const routes: Routes = [
    {
        path: "contact",
        component: ContactComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        ReactiveFormsModule, 
        MaterialModule
    ],
    declarations: [
        ContactComponent,
    ]
})
export class ContactModule {

}