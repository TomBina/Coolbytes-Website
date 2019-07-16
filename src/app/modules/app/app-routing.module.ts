import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found.component";

const routes: Routes = [
    {
        path: "admin",
        loadChildren: () => import("../admin/admin.module").then(m => m.AdminModule)
    },
    {
        path: "404",
        component: NotFoundComponent
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