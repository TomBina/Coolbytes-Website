import { ShareComponent } from "./share/share.component";
import { NgModule } from "@angular/core";

import { MdComponent } from "./md/md.component";

@NgModule({
  imports: [
  ],
  declarations: [
    MdComponent,
    ShareComponent
  ],
  exports: [
    MdComponent,
    ShareComponent
  ]
})
export class SharedModule { }