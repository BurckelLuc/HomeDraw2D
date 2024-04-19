import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShapesModule} from "./components/shapes/shapes.module";
import {AppComponent} from "./app.component";
import {CanvaComponent} from "./components/canva/canva.component";
import {DynamicModule} from "ng-dynamic-component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {ShapesService} from "./services/shapes.service";
import {MousePositionService} from "./services/mouse-position.service";
import {CommandService} from "./services/command.service";
import {ToolService} from "./services/tool.service";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [
    CanvaComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    ShapesModule,
    DynamicModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    CanvaComponent
  ],
  providers: [
    ShapesService,
    MousePositionService,
    CommandService,
    ToolService
  ]
})
export class AppModule { }
