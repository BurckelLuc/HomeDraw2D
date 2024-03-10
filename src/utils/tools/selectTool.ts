import {BasicTool} from "./basicTool";
import {Line, Point} from "../shapes/shapes";

export class SelectTool extends BasicTool {
	override click(event: MouseEvent) {
		return null;
	}

	calculateSnapPoints(snapPoints: Point[], lines: Line[]): Point[] {
		return [];
	}

  hoverGhost(event: MouseEvent): any {
  }
}
