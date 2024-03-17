import { ShapesService } from "../../app/services/shapes.service";
import { Door } from "../shapes/door";
import { Point } from "../shapes/shapes";
import { BasicTool } from "./basicTool";
import {Option} from "nochoices";
import {ICommand} from "../../app/commands/ICommand";

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
}
