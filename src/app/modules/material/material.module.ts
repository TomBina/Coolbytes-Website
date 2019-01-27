import { MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatTableModule } from "@angular/material";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatTableModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatTableModule]
})
export class MaterialModule {

}