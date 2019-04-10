import { MatButtonModule, MatCheckboxModule, MatInputModule, 
  MatSelectModule, MatTableModule, MatListModule, MatGridListModule, MatIconModule, MatSnackBarModule } from "@angular/material";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule,
    MatSelectModule, MatTableModule, MatListModule, DragDropModule, MatGridListModule, MatIconModule, MatSnackBarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule,
    MatSelectModule, MatTableModule, MatListModule, DragDropModule, MatGridListModule, MatIconModule, MatSnackBarModule]
})
export class MaterialModule {

}