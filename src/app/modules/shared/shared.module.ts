import { ShareComponent } from "./share/share.component";
import { NgModule } from "@angular/core";

import { MdComponent } from "./md/md.component";
import { LazyLoadDirective } from "./lazy-load.directive";

@NgModule({
  imports: [
  ],
  declarations: [
    MdComponent,
    ShareComponent,
    LazyLoadDirective,
  ],
  exports: [
    MdComponent,
    ShareComponent,
    LazyLoadDirective
  ]
})
export class SharedModule { }