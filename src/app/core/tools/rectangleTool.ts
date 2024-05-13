import {BasicTool} from "./basicTool";
import {Shape} from "../shapes/componentShapes/shape";
import {Wall} from "../shapes/componentShapes/wall";
import {ShapesService} from "../../services/shapes.service";
import {ICommand} from "../../commands/ICommand";
import {ExtendShapeCommand} from "../../commands/extendShapeCommand";
import {AddShapeCommand} from "../../commands/addShapeCommand";
import {Option} from "nochoices";
import {Type} from "@angular/core";
import {Point} from "../shapes/point";
import {Node} from "../shapes/extendedShape/node";
import {Line} from "../shapes/line";
import {SplitLineCommand} from "../../commands/splitLineCommand";
import {CombinedCommand} from "../../commands/combinedCommand";

export class RectangleTool extends BasicTool {

  override leftClick(
    point: Point,
    shapeService: ShapesService,
    clickedOnShape: Option<Shape> = Option.None(),
  ): Option<ICommand> {
    if (this.currentPoint) {
      if (clickedOnShape.isSome()) {
        return this.onClickOnShape(point, clickedOnShape.unwrap(), shapeService);
      }

      console.log(shapeService.getCurrentShape())

      let newPoint: Point = this.hoverPoint ?? point;

      let currentPointCopy = this.currentPoint;
      this.currentPoint = newPoint;
      let pointExtremite1: Point = new Point(newPoint.x,currentPointCopy.y);
      let pointExtremite2: Point = new Point(currentPointCopy.x,newPoint.y);

      let wall = new Wall(shapeService.addPointAsNode(currentPointCopy), shapeService.addPointAsNode(pointExtremite1))
      let w2 = new Wall(shapeService.addPointAsNode(pointExtremite1), shapeService.addPointAsNode(newPoint))
      let w3 = new Wall(shapeService.addPointAsNode(newPoint), shapeService.addPointAsNode(pointExtremite2))
      let w4 = new Wall(shapeService.addPointAsNode(pointExtremite2), shapeService.addPointAsNode(currentPointCopy))
      wall.extend(w2);
      wall.extend(w3);
      wall.extend(w4);

      if (shapeService.getCurrentShape()) {
        return Option.Some(
          new ExtendShapeCommand(
            wall,
            shapeService.getCurrentShape()!.id,
            shapeService,
          ),
        );
      }
      else {
        this.unselect(shapeService);
        return Option.Some(new AddShapeCommand(wall, shapeService));
      }
    }
    else {
      this.currentPoint = this.hoverPoint ?? point;
      if (clickedOnShape.isSome() && clickedOnShape.unwrap() instanceof Wall) {
        let shape = clickedOnShape.unwrap() as Wall
        clickedOnShape.ifSome((shape) => shapeService.setCurrentShape(shape))
        //let result = this.createSplit(shape, this.currentPoint, shapeService)
        //if (result.isSome()) {
          //return Option.Some(new SplitLineCommand(result.unwrap().line, result.unwrap().pointNode, shape, shapeService))
        //}
      }
    }

    return Option.None();
  }

  onClickOnShape(
    point: Point,
    shape: Shape,
    shapeService: ShapesService,
  ): Option<ICommand> {
    if (!(shape instanceof Wall)) return Option.None();

    let currentShape = shapeService.getCurrentShape();
    if (!currentShape) {
      this.currentPoint = point;

      let result = this.createSplit(shape, point, shapeService)
      if (result.isNone()) return Option.None();

      return Option.Some(
        new SplitLineCommand(result.unwrap().line, result.unwrap().pointNode, shape, shapeService),
      );
    }

    // CLOSE
    if (currentShape.id == shape.id) {
      // Clicked on Self

      let commands: ICommand[] = []

      let result = this.createSplit(shape, point, shapeService)

      result.ifSome(({line, pointNode}) => {
        commands.push(new SplitLineCommand(line, pointNode, shape, shapeService));
      })


      let wall = new Wall(
        shapeService.addPointAsNode(this.currentPoint!),
        shapeService.addPointAsNode(point),
      );
      this.currentPoint = point;
      commands.push(new ExtendShapeCommand(wall, shape.id, shapeService));

      return Option.Some(new CombinedCommand(commands, shapeService));
    } else {

      let commands: ICommand[] = []

      let result = this.createSplit(shape, point, shapeService)

      result.ifSome(({line, pointNode}) => {
        commands.push(new SplitLineCommand(line, pointNode, shape, shapeService));
      })

      let wall = new Wall(
        shapeService.addPointAsNode(this.currentPoint!),
        shapeService.addPointAsNode(point),
      );
      commands.push(new ExtendShapeCommand(wall, currentShape.id, shapeService));
      commands.push(new ExtendShapeCommand(
        shapeService.getShapebyId(currentShape.id),
        shape.id,
        shapeService,
      ));
      this.currentPoint = point;

      return Option.Some(new CombinedCommand(commands, shapeService));
    }
  }

  createSplit(shape: Wall, point: Point, shapeService: ShapesService): Option<{line: Line, pointNode: Node}>{
    let pointNode = shapeService.addPointAsNode(point);
    if (shape.getNodes().includes(pointNode)) return Option.None();
    let line =  shape.lines
      .map((x) => x)
      .sort(
        (a, b) =>
          a.calculateLineDiff(pointNode) - b.calculateLineDiff(pointNode),
      )[0]
    return Option.Some({line, pointNode});
  }

  unselect(shapeService: ShapesService) {
    this.currentPoint = null;
    this.hoverPoint = null;
    shapeService.setCurrentShape(null);
    shapeService.setHoverShape(null);
  }

  override rightClick(shapeService: ShapesService): Option<ICommand> {
    this.unselect(shapeService);
    return Option.None();
  }

  override hoverGhost(point: Point, shapeService: ShapesService) {
    if (!this.currentPoint) return;
    let line = new Line(
      Node.fromPoint(this.currentPoint),
      Node.fromPoint(point),
    );
    let angle = Math.abs((line.getAngle() / Math.PI) * 180);

    if (angle < 5 || angle > 175) {
      point.y = this.currentPoint.y;
    } else if (angle > 85 && angle < 95) {
      point.x = this.currentPoint.x;
    }

    this.hoverPoint = point;
    shapeService.setHoverShape(
      new Wall(Node.fromPoint(this.currentPoint), Node.fromPoint(point)),
    );
  }

  override toolType(): Type<RectangleTool> {
    return RectangleTool;
  }

  override toolName(): string {
    return "Rectangle";
  }

  override toolIcon(): string {
    return "M 104.769531 20.0625 L 2.230469 20.0625 C 1 20.0625 0 21.0625 0 22.292969 L 0 84.707031 C 0 85.9375 1 86.9375 2.230469 86.9375 L 104.769531 86.9375 C 106 86.9375 107 85.9375 107 84.707031 L 107 22.292969 C 107 21.0625 106 20.0625 104.769531 20.0625 Z M 102.542969 82.480469 L 4.457031 82.480469 L 4.457031 24.519531 L 102.542969 24.519531 Z M 102.542969 82.480469";
  }
}
