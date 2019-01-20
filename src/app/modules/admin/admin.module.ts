import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AdminAuthorGuardService } from "../../services/admin-author-guard.service";
import { AdminGuardService } from "../../services/admin-guard.service";
import { AuthorsService } from "../../services/authorsservice/authors.service";
import { ResumeEventsService } from "../../services/resumeservice/resume-events.service";
import { SharedModule } from "../shared/shared.module";
import { AuthorComponent } from "./author/author.component";
import { AddBlogComponent } from "./blog/addblog/add-blog.component";
import { BlogManagerComponent } from "./blog/blog-manager.component";
import { PreviewBlogComponent } from "./blog/previewblog/preview-blog.component";
import { UpdateBlogComponent } from "./blog/updateblog/update-blog.component";
import { ImagesManagerComponent } from "./images/images-manager.component";
import { MenuComponent } from "./menu/menu.component";
import { ProcessAuthComponent } from "./processauth/process-auth.component";
import { AddResumeEventComponent } from "./resume/addresumeevent/add-resume-event.component";
import { PreviewResumeEventComponent } from "./resume/previewresumeevent/preview-resume-event.component";
import { ResumeManagerComponent } from "./resume/resume-manager.component";
import { UpdateResumeEventComponent } from "./resume/updateresumeevent/update-resume-event.component";
import { SettingsComponent } from "./settings/settings.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "processauth",
                component: ProcessAuthComponent
            },
            {
                path: "",
                component: BlogManagerComponent,
                canActivate: [AdminGuardService, AdminAuthorGuardService]
            },
            {
                path: "blogs",
                component: BlogManagerComponent,
                canActivate: [AdminGuardService, AdminAuthorGuardService]
            },
            {
                path: "blogs/add",
                component: AddBlogComponent,
                canActivate: [AdminGuardService, AdminAuthorGuardService]
            },
            {
                path: "blogs/edit/:id",
                component: UpdateBlogComponent,
                canActivate: [AdminGuardService, AdminAuthorGuardService]
            },
            {
                path: "resume/addevent",
                component: AddResumeEventComponent,
                canActivate: [AdminGuardService, AdminAuthorGuardService]
            },
            {
                path: "resume/event/:id",
                component: UpdateResumeEventComponent,
                canActivate: [AdminGuardService, AdminAuthorGuardService]
            },
            {
                path: "resume",
                component: ResumeManagerComponent,
                canActivate: [AdminGuardService, AdminAuthorGuardService]
            },
            {
                path: "author",
                component: AuthorComponent,
                canActivate: [AdminGuardService]
            },
            {
                path: "settings",
                component: SettingsComponent,
                canActivate: [AdminGuardService]
            }
        ]),
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        MenuComponent,
        ProcessAuthComponent,
        BlogManagerComponent,
        AddBlogComponent,
        UpdateBlogComponent,
        AuthorComponent,
        ImagesManagerComponent,
        PreviewBlogComponent,
        AddResumeEventComponent,
        ResumeManagerComponent,
        PreviewResumeEventComponent,
        UpdateResumeEventComponent,
        SettingsComponent
    ],
    providers: [
        AuthorsService,
        AdminGuardService,
        AdminAuthorGuardService,
        ResumeEventsService
    ]
})
export class AdminModule {

}