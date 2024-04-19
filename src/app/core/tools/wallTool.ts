import { BasicTool } from "./basicTool";
import { Shape } from "../shapes/componentShapes/shape";
import { Wall } from "../shapes/componentShapes/wall";
import { ShapesService } from "../../services/shapes.service";
import { ICommand } from "../../commands/ICommand";
import { ExtendShapeCommand } from "../../commands/extendShapeCommand";
import { AddShapeCommand } from "../../commands/addShapeCommand";
import { Option } from "nochoices";
import { Type } from "@angular/core";
import { Point } from "../shapes/point";
import { Node } from "../shapes/extendedShape/node";
import { Line } from "../shapes/line";
import { SplitLineCommand } from "../../commands/splitLineCommand";
import { NOTIMP } from "dns";
import { CombinedCommand } from "../../commands/combinedCommand";

export class WallTool extends BasicTool {
  override leftClick(
    point: Point,
    shapeService: ShapesService,
    clickedOnShape: Option<Shape> = Option.None(),
  ): Option<ICommand> {
    if (clickedOnShape.isSome()) {
      return this.onClickOnShape(point, clickedOnShape.unwrap(), shapeService);
    }

    if (this.currentPoint) {
      let newPoint: Point = this.hoverPoint ?? point;

      let currentPointCopy = this.currentPoint;
      this.currentPoint = newPoint;

      if (shapeService.getCurrentShape()) {
        let shape = new Wall(
          shapeService.addPointAsNode(currentPointCopy),
          shapeService.addPointAsNode(newPoint),
        ) as unknown as Shape;
        return Option.Some(
          new ExtendShapeCommand(
            shape,
            shapeService.getCurrentShape()!.id,
            shapeService,
          ),
        );
      } else {
        let shape = new Wall(
          shapeService.addPointAsNode(currentPointCopy),
          shapeService.addPointAsNode(newPoint),
        );
        return Option.Some(new AddShapeCommand(shape, shapeService));
      }
    } else {
      this.currentPoint = this.hoverPoint ?? point;
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
      let pointNode = shapeService.addPointAsNode(point);
      if (shape.getNodes().includes(pointNode)) {
        return Option.None();
      }
      let toSplit = shape.lines
        .map((x) => x)
        .sort(
          (a, b) =>
            a.calculateLineDiff(pointNode) - b.calculateLineDiff(pointNode),
        )[0];

      return Option.Some(
        new SplitLineCommand(toSplit, pointNode, shape, shapeService),
      );
    }

    // CLOSE
    if (currentShape.id == shape.id) {
      // Clicked on Self
      let wall = new Wall(
        shapeService.addPointAsNode(this.currentPoint!),
        shapeService.addPointAsNode(point),
      );
      return Option.Some(new ExtendShapeCommand(wall, shape.id, shapeService));
    } else {
      let wall = new Wall(
        shapeService.addPointAsNode(this.currentPoint!),
        shapeService.addPointAsNode(point),
      );
      let a = new ExtendShapeCommand(wall, currentShape.id, shapeService);
      let b = new ExtendShapeCommand(
        shapeService.getShapebyId(currentShape.id),
        shape.id,
        shapeService,
      );
      return Option.Some(new CombinedCommand([a, b], shapeService));
    }
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

  override toolType(): Type<WallTool> {
    return WallTool;
  }

  override toolName(): string {
    return "Wall";
  }
}
