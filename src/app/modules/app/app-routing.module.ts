import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "admin",
        loadChildren: "../admin/admin.module#AdminModule"
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
