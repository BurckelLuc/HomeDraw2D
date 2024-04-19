import { ShapesService } from "../../services/shapes.service";
import { Door } from "../shapes/componentShapes/door";
import { BasicTool } from "./basicTool";
import { Option } from "nochoices";
import { ICommand } from "../../commands/ICommand";
import { Type } from "@angular/core";
import { Point } from "../shapes/point";
import { Node } from "../shapes/extendedShape/node";
import { Shape } from "../shapes/componentShapes/shape";

export class DoorTool extends BasicTool {
  override leftClick(
    clickedPoint: Point,
    shapeService: ShapesService,
    clickedOnShape: Option<Shape>,
  ): Option<ICommand> {
    throw new Error("Method not implemented.");
  }

  override rightClick(shapeService: ShapesService): Option<ICommand> {
    throw new Error("Method not implemented.");
  }

  override hoverGhost(point: Point, shapeService: ShapesService) {
    this.hoverPoint = point;
    shapeService.setHoverShape(new Door(20, Node.fromPoint(point)));
  }

  override toolType(): Type<DoorTool> {
    return DoorTool;
  }

  override toolName(): string {
    return "Door";
  }
  
  override toolIcon(): string {
    return "M 15.71875 41.003906 L 15.71875 73.257812 L 2.570312 73.257812 L 2.570312 79.222656 L 22.007812 79.222656 L 22.007812 13.628906 L 23.148438 13.628906 C 25.0625 13.628906 31.09375 15.019531 35.582031 16.496094 C 55.328125 23 71.160156 37.878906 78.449219 56.789062 C 80.9375 63.234375 82.59375 71.582031 82.59375 77.546875 L 82.59375 79.589844 L 84.964844 79.421875 C 86.25 79.308594 91.253906 79.222656 96.113281 79.222656 L 104.886719 79.222656 L 104.886719 73.257812 L 85.851562 73.257812 L 85.507812 70.191406 C 84.335938 59.714844 80.5625 49.179688 74.960938 40.632812 C 69.445312 32.226562 63.386719 26.09375 55.15625 20.671875 C 44.296875 13.515625 32.351562 9.625 19.234375 8.945312 L 15.71875 8.773438 Z M 15.71875 41.003906";
  }
}
