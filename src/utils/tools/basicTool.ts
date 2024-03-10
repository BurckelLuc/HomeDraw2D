import {Line, Point, Shape} from "../shapes/shapes";
import {ShapesService} from "../../app/services/shapes.service";

export abstract class BasicTool {
  currentPoint : Point | null = null;
  hoverPoint : Point | null = null;

	abstract click(event: MouseEvent, shapeService: ShapesService) : any;
	abstract calculateSnapPoints(snapPoints: Point[], lines:Line[]) : Point[];
  abstract hoverGhost(event: MouseEvent): any;
}
