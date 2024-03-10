import {BasicTool} from "./basicTool";
import {Line, Point, Shape} from "../shapes/shapes";
import * as isect from "isect";
import {Wall} from "../shapes/wall";
import {ShapesService} from "../../app/services/shapes.service";
import {WallComponent} from "../../app/shapes/wall/wall.component";


export class WallTool extends BasicTool {

	override click(event: MouseEvent, shapeService: ShapesService) : Shape | null {
		if (event.button == 0) {
			if (this.currentPoint) {
				let newPoint: Point = this.hoverPoint ?? {x: event.clientX, y: event.clientY};
        let currentPointCopy = this.currentPoint
        this.currentPoint = newPoint;
        if (shapeService.getCurrentShape()) {
          console.log(shapeService.getCurrentShape())
          shapeService.getCurrentShape()?.extend(new Wall(currentPointCopy, newPoint) as unknown as Shape)
          return shapeService.getCurrentShape()
        } else {
          let shape = new Wall(currentPointCopy, newPoint)
          shapeService.setCurrentShape(shape as unknown as Shape<WallComponent>)
          return shapeService.getCurrentShape();
        }
			} else {
				this.currentPoint = this.hoverPoint ?? { x: event.clientX, y: event.clientY}
        return null;
			}
		}
    this.currentPoint = null;
    shapeService.setCurrentShape(null);
    return null;
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

  override hoverGhost(event:MouseEvent) {
    if (!this.currentPoint) return null;
    let newPoint: Point = {x: event.clientX, y: event.clientY};
    return new Wall(this.currentPoint, newPoint)
  }
}
