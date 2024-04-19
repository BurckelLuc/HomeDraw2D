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

export class WallTool extends BasicTool {
  override leftClick(
    point: Point,
    shapeService: ShapesService,
    clickedOnShape: Option<Shape> = Option.None(),
  ): Option<ICommand> {


    if (this.currentPoint) {
      if (clickedOnShape.isSome()) {
        return this.onClickOnShape(point, clickedOnShape.unwrap(), shapeService);
      }

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
      if (clickedOnShape.isSome() && clickedOnShape.unwrap() instanceof Wall) {
        let shape = clickedOnShape.unwrap() as Wall
        clickedOnShape.ifSome((shape) => shapeService.setCurrentShape(shape))
        let result = this.createSplit(shape, this.currentPoint, shapeService)
        if (result.isSome()) {
          return Option.Some(new SplitLineCommand(result.unwrap().line, result.unwrap().pointNode, shape, shapeService))
        }
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

  override toolType(): Type<WallTool> {
    return WallTool;
  }

  override toolName(): string {
    return "Wall";
  }

  override toolIcon(): string {
    return "M 93.707031 7.742188 C 92.355469 8.34375 92.253906 8.410156 91.550781 9.179688 C 91.269531 9.496094 90.917969 9.863281 90.78125 9.980469 C 88.140625 12.472656 87.136719 13.425781 86.9375 13.660156 C 86.804688 13.828125 86.4375 14.175781 86.136719 14.460938 C 85.835938 14.730469 84.664062 15.867188 83.527344 16.96875 C 81.269531 19.160156 77.675781 22.652344 76.238281 24.023438 C 75.734375 24.507812 75.082031 25.160156 74.800781 25.445312 C 74.515625 25.746094 73.179688 27.050781 71.824219 28.339844 C 70.46875 29.625 68.582031 31.429688 67.644531 32.351562 C 66.707031 33.269531 65.386719 34.558594 64.703125 35.226562 C 64.015625 35.894531 63.296875 36.582031 63.113281 36.78125 C 61.523438 38.371094 58.132812 41.628906 58.046875 41.628906 C 57.996094 41.628906 57.144531 42.433594 56.175781 43.417969 C 55.1875 44.421875 52.597656 46.945312 50.40625 49.070312 C 45.058594 54.21875 44.839844 54.4375 42.414062 56.792969 C 41.261719 57.929688 40.242188 58.851562 40.140625 58.851562 C 40.042969 58.851562 39.957031 58.898438 39.957031 58.984375 C 39.957031 59.050781 39.65625 59.402344 39.273438 59.769531 C 38.90625 60.136719 38.402344 60.65625 38.152344 60.941406 C 37.902344 61.207031 37.535156 61.574219 37.316406 61.777344 C 37.117188 61.960938 35.980469 63.046875 34.792969 64.199219 C 33.605469 65.355469 31.414062 67.460938 29.925781 68.882812 C 28.4375 70.300781 26.484375 72.191406 25.597656 73.0625 C 24.695312 73.929688 23.488281 75.117188 22.886719 75.6875 C 22.304688 76.253906 21.652344 76.941406 21.433594 77.222656 C 21.214844 77.507812 20.949219 77.742188 20.832031 77.742188 C 20.730469 77.742188 20.347656 78.078125 20.011719 78.496094 C 19.660156 78.914062 19.292969 79.246094 19.175781 79.246094 C 19.058594 79.246094 18.808594 79.496094 18.609375 79.796875 C 18.390625 80.082031 17.722656 80.785156 17.101562 81.335938 C 16.5 81.886719 15.265625 83.058594 14.378906 83.929688 C 13.492188 84.796875 12.171875 86.085938 11.4375 86.785156 C 10.714844 87.488281 9.964844 88.257812 9.78125 88.492188 C 9.597656 88.742188 9.378906 88.945312 9.3125 88.945312 C 9.042969 88.945312 7.238281 90.851562 6.871094 91.5 C 6.6875 91.851562 6.519531 92.386719 6.519531 92.707031 C 6.519531 93.023438 6.453125 93.289062 6.351562 93.289062 C 6.152344 93.289062 6.136719 94.84375 6.335938 95.261719 C 6.402344 95.414062 6.652344 95.914062 6.871094 96.367188 C 7.371094 97.371094 8.59375 98.375 9.730469 98.722656 C 10.667969 98.992188 12.304688 99.058594 12.4375 98.824219 C 12.488281 98.757812 12.773438 98.640625 13.058594 98.574219 C 13.339844 98.523438 13.777344 98.324219 14.042969 98.140625 C 14.292969 97.957031 14.578125 97.804688 14.664062 97.804688 C 14.730469 97.804688 15.046875 97.453125 15.363281 97.050781 C 15.664062 96.632812 15.984375 96.300781 16.050781 96.300781 C 16.117188 96.300781 16.851562 95.613281 17.671875 94.796875 C 18.507812 93.960938 19.261719 93.289062 19.359375 93.289062 C 19.476562 93.289062 19.5625 93.222656 19.5625 93.140625 C 19.5625 92.90625 20.816406 91.617188 21.03125 91.617188 C 21.148438 91.617188 21.234375 91.550781 21.234375 91.46875 C 21.234375 91.300781 21.316406 91.21875 24.894531 87.773438 C 26.464844 86.253906 28.804688 83.976562 30.09375 82.722656 C 31.363281 81.453125 32.449219 80.417969 32.519531 80.417969 C 32.566406 80.417969 33.136719 79.867188 33.773438 79.214844 C 34.40625 78.542969 35.058594 77.875 35.210938 77.742188 C 35.359375 77.609375 35.828125 77.140625 36.261719 76.6875 C 36.699219 76.253906 37.097656 75.902344 37.148438 75.902344 C 37.234375 75.902344 40.441406 72.777344 46.34375 66.957031 C 47.613281 65.722656 48.703125 64.703125 48.75 64.703125 C 48.902344 64.703125 51.308594 62.144531 51.328125 61.992188 C 51.328125 61.925781 51.460938 61.84375 51.628906 61.792969 C 51.792969 61.742188 52.5625 61.039062 53.332031 60.253906 C 54.117188 59.46875 55.019531 58.582031 55.339844 58.296875 C 55.65625 57.996094 56.894531 56.808594 58.097656 55.65625 C 59.285156 54.488281 61.023438 52.816406 61.941406 51.929688 C 62.863281 51.042969 64.519531 49.421875 65.636719 48.316406 C 66.742188 47.214844 67.746094 46.3125 67.84375 46.3125 C 67.960938 46.3125 68.046875 46.242188 68.046875 46.160156 C 68.046875 45.976562 68.230469 45.792969 72.625 41.546875 C 74.433594 39.789062 76.988281 37.332031 78.292969 36.0625 C 79.597656 34.808594 80.683594 33.773438 80.703125 33.773438 C 80.734375 33.773438 81.839844 32.683594 83.175781 31.347656 C 84.511719 30.011719 85.632812 28.921875 85.699219 28.921875 C 85.765625 28.921875 86.300781 28.386719 88.410156 26.214844 C 88.476562 26.132812 88.976562 25.664062 89.527344 25.144531 C 90.082031 24.625 92.035156 22.753906 93.875 20.964844 C 95.714844 19.191406 97.804688 17.1875 98.523438 16.519531 C 99.226562 15.847656 99.8125 15.199219 99.8125 15.097656 C 99.8125 14.980469 99.996094 14.476562 100.230469 13.976562 C 100.664062 13.023438 100.8125 11.320312 100.480469 11.117188 C 100.394531 11.066406 100.3125 10.867188 100.3125 10.683594 C 100.3125 10.515625 100.246094 10.367188 100.179688 10.367188 C 100.113281 10.367188 99.945312 10.097656 99.828125 9.78125 C 99.542969 8.976562 98.421875 8.074219 97.320312 7.757812 C 96.800781 7.605469 96.25 7.421875 96.097656 7.339844 C 95.597656 7.089844 94.929688 7.1875 93.707031 7.742188 Z M 93.707031 7.742188";
  }
}
