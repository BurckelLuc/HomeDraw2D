import { ShapesService } from "../../app/services/shapes.service";
import { Door } from "../shapes/componentShapes/door";
import { BasicTool } from "./basicTool";
import {Option} from "nochoices";
import {ICommand} from "../../app/commands/ICommand";
import {Type} from "@angular/core";
import {Point} from "../shapes/point";

export class DoorTool extends BasicTool {
  override leftClick(
    clickedPoint: Point,
    shapeService: ShapesService,
    clickedOnShape: boolean,
  ): Option<ICommand> {
    throw new Error("Method not implemented.");
  }

  override rightClick(shapeService: ShapesService) : Option<ICommand> {
    throw new Error("Method not implemented.");
  }

  override hoverGhost(point: Point, shapeService: ShapesService) {
    this.hoverPoint = point;
    shapeService.setHoverShape(new Door(20, point));
  }

  override toolType(): Type<DoorTool> {
    return DoorTool
  }
}
