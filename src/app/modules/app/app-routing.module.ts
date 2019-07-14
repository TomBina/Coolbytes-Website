import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "admin",
        loadChildren: () => import("../admin/admin.module").then(m => m.AdminModule)
    },
    {
        path: "post",
        loadChildren: () => import("../blogpost/blogpost.module").then(m => m.BlogPostModule)        
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }