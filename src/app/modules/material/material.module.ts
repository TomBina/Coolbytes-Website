import { MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule } from "@angular/material";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule],
})
export class MaterialModule {

}