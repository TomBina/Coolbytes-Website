import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AboutComponent } from "./about/about.component";
import { AuthorComponent } from "./about/author/author.component";
import { ResumeEventComponent } from "./about/resumeevent/resume-event.component";
import { BlogPostIntroComponent } from "./blog-post-intro.component";
import { BlogPostComponent } from "./blog-post.component";
import { BlogComponent } from "./blog.component";
import { ContactComponent } from "./contact/contact.component";
import { MaterialModule } from "../material/material.module";

const routes: Routes = [
    {
        path: "",
        component: BlogComponent
    },
    {
        path: "home/tag/:tag",
        component: BlogComponent
    },
    {
        path: "home",
        component: BlogComponent
    },
    {
        path: "post/:id/:title",
        component: BlogPostComponent
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "contact",
        component: ContactComponent
    }
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
        BlogComponent,
        BlogPostIntroComponent,
        BlogPostComponent,
        AboutComponent,
        ResumeEventComponent,
        AuthorComponent,
        ContactComponent
    ]
})
export class HomeModule {

}