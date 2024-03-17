import {Line, Point, Shape} from "../shapes/shapes";
import {ShapesService} from "../../app/services/shapes.service";
import {Type} from "@angular/core";
import {ICommand} from "../../app/commands/ICommand";
import {Option} from "nochoices";

export abstract class BasicTool {
  currentPoint : Point | null = null;
  hoverPoint : Point | null = null;

	abstract leftClick(clickedPoint: Point, shapeService: ShapesService, clickedOnShape: boolean) : Option<ICommand>;
  abstract rightClick(shapeService: ShapesService) : Option<ICommand>;
  abstract hoverGhost(point: Point, shapeService: ShapesService) : void;
}
