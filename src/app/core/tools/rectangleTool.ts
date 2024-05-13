import { BasicTool } from "./basicTool";
import { Shape } from "../shapes/componentShapes/shape";
import { Wall } from "../shapes/componentShapes/wall";
import { ShapesService } from "../../services/shapes.service";
import { ICommand } from "../../commands/ICommand";
import { AddShapeCommand } from "../../commands/addShapeCommand";
import { Option } from "nochoices";
import { Type } from "@angular/core";
import { Point } from "../shapes/point";
import { Node } from "../shapes/extendedShape/node";
import { Line } from "../shapes/line";
import { SplitLineCommand } from "../../commands/splitLineCommand";
import { CombinedCommand } from "../../commands/combinedCommand";

export class RectangleTool extends BasicTool {
  override leftClick(
    point: Point,
    shapeService: ShapesService,
    clickedOnShape: Option<Shape> = Option.None(),
  ): Option<ICommand> {
    let commands: ICommand[] = [];
    if (this.currentPoint) {
      if (clickedOnShape.isSome() && clickedOnShape.unwrap() instanceof Wall) {
        let result = this.createSplit(
          clickedOnShape.unwrap() as Wall,
          point,
          shapeService,
        );
        if (result.isSome()) {
          let unwrapped = result.unwrap();
          commands.push(
            new SplitLineCommand(
              unwrapped.line,
              unwrapped.pointNode,
              clickedOnShape.unwrap() as Wall,
              shapeService,
            ),
          );
        }
      }

      console.log(shapeService.getCurrentShape());

      let newPoint: Point = this.hoverPoint ?? point;

      let currentPointCopy = this.currentPoint;
      this.currentPoint = newPoint;
      let pointExtremite1: Point = new Point(newPoint.x, currentPointCopy.y);
      let pointExtremite2: Point = new Point(currentPointCopy.x, newPoint.y);

      let w1 = new Wall(
        shapeService.addPointAsNode(currentPointCopy),
        shapeService.addPointAsNode(pointExtremite1),
      );
      let w2 = new Wall(
        shapeService.addPointAsNode(pointExtremite1),
        shapeService.addPointAsNode(newPoint),
      );
      let w3 = new Wall(
        shapeService.addPointAsNode(newPoint),
        shapeService.addPointAsNode(pointExtremite2),
      );
      let w4 = new Wall(
        shapeService.addPointAsNode(pointExtremite2),
        shapeService.addPointAsNode(currentPointCopy),
      );

      commands = commands.concat(
        [w1, w2, w3, w4].map((x) => new AddShapeCommand(x, shapeService)),
      );

      return Option.Some(new CombinedCommand(commands, shapeService));
    } else {
      this.currentPoint = this.hoverPoint ?? point;
      if (clickedOnShape.isSome() && clickedOnShape.unwrap() instanceof Wall) {
        clickedOnShape.ifSome((shape) => shapeService.setCurrentShape(shape));
      }
    }

    return Option.None();
  }

  createSplit(
    shape: Wall,
    point: Point,
    shapeService: ShapesService,
  ): Option<{ line: Line; pointNode: Node }> {
    let pointNode = shapeService.addPointAsNode(point);
    if (shape.getNodes().includes(pointNode)) return Option.None();
    let line = shape.lines
      .map((x) => x)
      .sort(
        (a, b) =>
          a.calculateLineDiff(pointNode) - b.calculateLineDiff(pointNode),
      )[0];
    return Option.Some({ line, pointNode });
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
