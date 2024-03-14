import {BasicTool} from "./basicTool";
import {Line, Point, Shape} from "../shapes/shapes";
import * as isect from "isect";
import {Wall} from "../shapes/wall";
import {ShapesService} from "../../app/services/shapes.service";
import {WallComponent} from "../../app/shapes/wall/wall.component";


export class WallTool extends BasicTool {

	override leftClick(point: Point, shapeService: ShapesService, clickedOnShape: boolean = false) {
			if (this.currentPoint) {
				let newPoint: Point = this.hoverPoint ?? point;
        let currentPointCopy = this.currentPoint
        this.currentPoint = newPoint;
        if (shapeService.getCurrentShape()) {
          shapeService.getCurrentShape()?.extend(new Wall(currentPointCopy, newPoint) as unknown as Shape)
        } else {
          let shape = new Wall(currentPointCopy, newPoint)
          shapeService.setCurrentShape(shape as unknown as Shape<WallComponent>)
          shapeService.addShape(shape);
        }
        if (clickedOnShape) {
          this.unselect(shapeService)
        }
			} else {
				this.currentPoint = this.hoverPoint ?? point
			}
	}

  unselect(shapeService: ShapesService) {
      this.currentPoint = null;
      this.hoverPoint = null;
      shapeService.setCurrentShape(null);
  }

  override rightClick(shapeService: ShapesService) {
    this.unselect(shapeService);
  }

  override hoverGhost(point :Point) {
    if (!this.currentPoint) return null;
    return new Wall(this.currentPoint, point)
  }
}
