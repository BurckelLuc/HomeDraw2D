import {Line, Point, Shape} from "../shapes/shapes";
import {ShapesService} from "../../app/services/shapes.service";
import {Type} from "@angular/core";

export abstract class BasicTool {
  currentPoint : Point | null = null;
  hoverPoint : Point | null = null;

	abstract leftClick(clickedPoint: Point, shapeService: ShapesService, clickedOnShape: boolean) : any;
  abstract rightClick(shapeService: ShapesService) : any;
  abstract hoverGhost(point: Point, shapeService: ShapesService) : any;
}
