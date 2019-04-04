import { MatButtonModule, MatCheckboxModule, MatInputModule, 
  MatSelectModule, MatTableModule, MatListModule, MatGridListModule, MatIconModule } from "@angular/material";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule,
    MatSelectModule, MatTableModule, MatListModule, DragDropModule, MatGridListModule, MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule,
    MatSelectModule, MatTableModule, MatListModule, DragDropModule, MatGridListModule, MatIconModule]
})
export class MaterialModule {

}