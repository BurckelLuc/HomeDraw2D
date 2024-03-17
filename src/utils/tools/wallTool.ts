import {BasicTool} from "./basicTool";
import {Line, Point, Shape} from "../shapes/shapes";
import {Wall} from "../shapes/wall";
import {ShapesService} from "../../app/services/shapes.service";
import {WallComponent} from "../../app/shapes/wall/wall.component";
import {ICommand} from "../../app/commands/ICommand";
import {ExtendShapeCommand} from "../../app/commands/extendShapeCommand";
import {AddShapeCommand} from "../../app/commands/addShapeCommand";
import {Option} from "nochoices";


export class WallTool extends BasicTool {

	override leftClick(point: Point, shapeService: ShapesService, clickedOnShape: boolean = false) : Option<ICommand> {
			if (this.currentPoint) {
				let newPoint: Point =  this.hoverPoint ?? point;
        if (clickedOnShape) newPoint = point;

        let currentPointCopy = this.currentPoint
        this.currentPoint = newPoint;
        if (shapeService.getCurrentShape()) {
          let shape = new Wall(currentPointCopy, newPoint) as unknown as Shape;
          return Option.Some(new ExtendShapeCommand(shape, shapeService.getCurrentShape()!.id, shapeService))
        } else {
          let shape = new Wall(currentPointCopy, newPoint)
          return Option.Some(new AddShapeCommand(shape, shapeService))
        }
			} else {
				this.currentPoint = this.hoverPoint ?? point
			}
      return Option.None()
	}

  unselect(shapeService: ShapesService) {
      this.currentPoint = null;
      this.hoverPoint = null;
      shapeService.setCurrentShape(null);
      shapeService.setHoverShape(null)
  }

  override rightClick(shapeService: ShapesService) : Option<ICommand> {
    this.unselect(shapeService);
    return Option.None()
  }

  override hoverGhost(point: Point, shapeService: ShapesService) {
    if (!this.currentPoint) return;
    let line = new Line(this.currentPoint, point);
    let angle = Math.abs(line.getAngle() / Math.PI * 180);

    if (angle < 5 || angle > 175) {
      point.y = this.currentPoint.y
    }
    else if (angle > 85 && angle < 95) {
      point.x = this.currentPoint.x
    }

    this.hoverPoint = point;
    shapeService.setHoverShape(new Wall(this.currentPoint, point))
  }
}
