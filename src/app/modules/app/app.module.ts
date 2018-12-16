import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomeModule } from "../home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from './footer.component';
import { HeaderComponent } from "./header.component";
import { AuthService } from "../../services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { ImagesService } from "../../services/imagesservice/images.service";

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
  providers: [AuthService, ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }