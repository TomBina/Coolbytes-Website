import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule,
    MatSelectModule, MatTableModule, MatListModule, DragDropModule, MatGridListModule, MatIconModule, MatSnackBarModule,
    MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule,
    MatSelectModule, MatTableModule, MatListModule, DragDropModule, MatGridListModule, MatIconModule, MatSnackBarModule,
    MatDialogModule]
})
export class MaterialModule {

}