import { Line, Point } from "../shapes/shapes";

export abstract class BasicTool {
	abstract click(event: MouseEvent, currentPoint: Point | null, hoverPoint: Point | null, snapPoints: Point[], lines:Line[], discarded: Line[]) : Point | null;
	abstract calculateSnapPoints(snapPoints: Point[], lines:Line[]) : Point[];
}
