import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found.component";

const routes: Routes = [
    {
        path: "admin",
        loadChildren: () => import("../admin/admin.module").then(m => m.AdminModule)
    },
    {
        path: "post",
        loadChildren: () => import("../blogpost/blogpost.module").then(m => m.BlogPostModule)
    },
    {
        path: "about",
        loadChildren: () => import("../about/about.module").then(m => m.AboutModule)
    },
    {
        path: "contact",
        loadChildren: () => import("../contact/contact.module").then(m => m.ContactModule)
    },
    {
        path: "404",
        component: NotFoundComponent
    },
    {
        path: "",
        loadChildren: () => import("../home/home.module").then(m => m.HomeModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
    ],
    exports: [RouterModule],
    providers: [],
    declarations: [NotFoundComponent]
})
export class AppRoutingModule { }