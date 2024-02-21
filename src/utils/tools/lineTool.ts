import {BasicTool} from "./basicTool";
import {Line, Point} from "../shapes/shapes";
import * as isect from "isect";


export class LineTool extends BasicTool {
	override click(event: MouseEvent, currentPoint: Point, hoverPoint: Point, snapPoints: Point[], lines:Line[], discarded: Line[]) {
		if (event.button == 0) {
			if (currentPoint) {
				let newPoint: Point = hoverPoint ?? {x: event.clientX, y: event.clientY};
				lines.push({begin: currentPoint, end: newPoint});

				snapPoints.splice(0, snapPoints.length);
				snapPoints.push(...this.calculateSnapPoints(snapPoints, lines));

				currentPoint = newPoint;
				discarded = []
			} else {
				currentPoint = hoverPoint ?? { x: event.clientX, y: event.clientY}
			}
		}

		return currentPoint;
	}

	calculateSnapPoints(snapPoints: Point[], lines:Line[]) {
		let x = lines.map(x => {return {from: {x: x.begin.x, y: x.begin.y}, to: {x: x.end.x, y: x.end.y}}});
		let sweep = isect.sweep(x, {});
		let result = sweep.run();
		let possiblesPoints: [number, number][] = result.map((x:{point: Point}) => [x.point.x, x.point.y]).concat(lines.map(x => [[x.begin.x, x.begin.y], [x.end.x, x.end.y]]).flat())
		snapPoints = [...new Set(possiblesPoints)].map((z: [number, number]) => {
			return {x: z[0], y: z[1]}
		});

		return snapPoints;
	}
}
