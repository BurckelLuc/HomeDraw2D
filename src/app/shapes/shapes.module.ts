import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WallComponent} from "./wall/wall.component";



@NgModule({
  declarations: [
    WallComponent
  ],
  exports: [
    WallComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShapesModule { }
