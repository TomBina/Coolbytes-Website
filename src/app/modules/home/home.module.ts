import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes, UrlSegment } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { BlogCategoryComponent } from "./blog-category.component";
import { BlogLoadingComponent } from "./blog-loading.component";
import { BlogPostIntroComponent } from "./blog-post-intro.component";
import { BlogComponent } from "./blog.component";
import { CategoryComponent } from "./category.component";
import { TagComponent } from "./tag.component";
import { MaterialModule } from "../material/material.module";

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
        matcher: checkRoute,
        component: CategoryComponent
    }
];

export function checkRoute(segments, group, route) {
    return {
        consumed: segments,
        posParams: {
            category: new UrlSegment(segments[0].path, {})
        }
    };
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MaterialModule
    ],
    declarations: [
        BlogComponent,
        BlogLoadingComponent,
        BlogCategoryComponent,
        CategoryComponent,
        BlogPostIntroComponent,
        TagComponent
    ]
})
export class HomeModule {

}