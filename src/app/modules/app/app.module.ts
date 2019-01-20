import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomeModule } from "../home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";
import { httpInterceptorProviders } from "../../services/httpinterceptors";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HomeModule,
    AppRoutingModule
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
