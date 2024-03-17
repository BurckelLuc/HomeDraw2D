import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WallComponent } from "./wall/wall.component";
import { DoorComponent } from "./door/door.component";

@NgModule({
  declarations: [WallComponent, DoorComponent],
  exports: [WallComponent, DoorComponent],
  imports: [CommonModule],
})
export class ShapesModule {}
