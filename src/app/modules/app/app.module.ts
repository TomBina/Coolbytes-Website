import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { httpInterceptorProviders } from "../../services/httpinterceptors";
import { MaterialModule } from "../material/material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";
import { HomeModule } from "../home/home.module";
import { BlogPostModule } from "../blogpost/blogpost.module";
import { AboutModule } from "../about/about.module";
import { ContactModule } from "../contact/contact.module";

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HomeModule,
    BlogPostModule,
    AboutModule,
    ContactModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    httpInterceptorProviders
  ]
})
export class AppModule { }
