import { ShapesService } from "../../app/services/shapes.service";
import { Door } from "../shapes/door";
import { Point } from "../shapes/shapes";
import { BasicTool } from "./basicTool";

export class DoorTool extends BasicTool {
  override leftClick(
    clickedPoint: Point,
    shapeService: ShapesService,
    clickedOnShape: boolean,
  ) {
    throw new Error("Method not implemented.");
  }

  override rightClick(shapeService: ShapesService) {
    throw new Error("Method not implemented.");
  }

  override hoverGhost(point: Point, shapeService: ShapesService) {
    this.hoverPoint = point;
    shapeService.setHoverShape(new Door(20, point));
  }
}
