import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { BlogPostExternalLinksComponent } from "./blog-post-external-links.component";
import { BlogPostLoadingComponent } from "./blog-post-loading.component";
import { BlogPostMenuComponent } from "./blog-post-menu.component";
import { BlogPostRelatedComponent } from "./blog-post-related.component";
import { BlogPostViewCodeComponent } from "./blog-post-view-code.component";
import { BlogPostComponent } from "./blog-post.component";

export const routes: Routes = [
    {
        path: ":id/:title",
        component: BlogPostComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MaterialModule
    ],
    declarations: [
        BlogPostComponent,
        BlogPostLoadingComponent,
        BlogPostMenuComponent,
        BlogPostRelatedComponent,
        BlogPostViewCodeComponent,
        BlogPostExternalLinksComponent
    ]
})
export class BlogPostModule {

}