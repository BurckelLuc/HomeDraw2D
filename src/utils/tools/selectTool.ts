import {BasicTool} from "./basicTool";
import {Line, Point} from "../shapes/shapes";
import {ShapesService} from "../../app/services/shapes.service";

export class SelectTool extends BasicTool {
	override leftClick(clickedPoint: Point) {
		return null;
	}


  hoverGhost(point: Point): any {
  }

  rightClick(shapeService: ShapesService): any {
  }
}
