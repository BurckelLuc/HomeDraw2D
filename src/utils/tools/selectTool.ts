import {BasicTool} from "./basicTool";
import {Line, Point} from "../shapes/shapes";

export class SelectTool extends BasicTool {
	override click(event: MouseEvent, currentPoint: Point, hoverPoint: Point, snapPoints: Point[], lines:Line[], discarded: Line[]) {
		return null;
	}

	calculateSnapPoints(snapPoints: Point[], lines: Line[]): Point[] {
		return [];
	}
}
