import {EventEmitter, Injectable, Type} from '@angular/core';
import {BasicTool} from "../core/tools/basicTool";
import {WallTool} from "../core/tools/wallTool";
import {MousePositionService} from "./mouse-position.service";
import {Shape} from "../core/shapes/componentShapes/shape";

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private tool : BasicTool = new WallTool()
  private toolEmitter: EventEmitter<BasicTool> = new EventEmitter()

  setTool(tool: Type<BasicTool>) {
    this.tool = new tool()
    this.toolEmitter.emit(this.tool)
  }

  getTool() {
    return this.tool;
  }

  subscribe(callback : (tool : BasicTool) => void) {
    this.toolEmitter.subscribe(callback)
  }
}
