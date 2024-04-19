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
}
