import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes, UrlSegment } from "@angular/router";
import { NotFoundComponent } from "../app/not-found.component";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { AboutComponent } from "./about/about.component";
import { AuthorComponent } from "./about/author/author.component";
import { ResumeEventComponent } from "./about/resumeevent/resume-event.component";
import { BlogCategoryComponent } from "./blog-category.component";
import { BlogLoadingComponent } from "./blog-loading.component";
import { BlogPostIntroComponent } from "./blog-post-intro.component";
import { BlogComponent } from "./blog.component";
import { CategoryComponent } from "./category.component";
import { ContactComponent } from "./contact/contact.component";
import { TagComponent } from "./tag.component";

export const routes: Routes = [
    {
        path: "",
        component: BlogComponent
    },
    {
        path: "tag/:tag",
        component: TagComponent
    },
    {
        path: "home",
        component: BlogComponent
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "contact",
        component: ContactComponent
    },
    {
        path: "404",
        component: NotFoundComponent
    },
    {
        component: CategoryComponent,
        matcher: checkRoute
    }
];

export function checkRoute(segments, group, route) {
    let isAdmin = segments.some(s => s.path.includes("admin") || s.path.includes("post"));
    return isAdmin ? null : ({
        consumed: segments,
        posParams: {
            category: new UrlSegment(segments[0].path, {})
        }
    });
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    declarations: [
        BlogComponent,
        BlogLoadingComponent,
        BlogCategoryComponent,
        CategoryComponent,
        BlogPostIntroComponent,
        AboutComponent,
        ResumeEventComponent,
        AuthorComponent,
        ContactComponent,
        TagComponent,
        NotFoundComponent
    ]
})
export class HomeModule {

}