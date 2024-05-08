import { Shape } from "./shape";
import { WallComponent } from "../../../components/shapes/wall/wall.component";
import { Point } from "../point";
import { Node } from "../extendedShape/node";
import { Line } from "../line";

export class Rectangle extends Shape<WallComponent> {
  lines: Line[] = [];

  constructor(topLeft: Node, topRight: Node, bottomRight: Node, bottomLeft: Node) {
    super(WallComponent);
    this.lines.push(new Line(topLeft, topRight));
    this.lines.push(new Line(topRight, bottomRight));
    this.lines.push(new Line(bottomRight, bottomLeft));
    this.lines.push(new Line(bottomLeft, topLeft));
  }

  override extend(shape: Shape): void {
    if (shape.componentType == WallComponent) {
      let rectangle = shape as unknown as Rectangle;
      this.lines.push(rectangle.lines[0]);
      this.lines.push(rectangle.lines[1]);
      this.lines.push(rectangle.lines[2]);
      this.lines.push(rectangle.lines[3]);
    }
  }

  override unextend(shape: Shape) {
    if (shape.componentType == WallComponent) {
      let wall = shape as unknown as Rectangle;
      this.lines = this.lines.filter((x) => !wall.lines.includes(x));
    }
  }

  getClosestPoint(comparisonPoint: Point): Point {
    let points = [this.lines[0].begin].concat(this.lines.map((x) => x.end));
    points.sort(
      (a, b) => a.distance(comparisonPoint) - b.distance(comparisonPoint),
    );
    if (points.length && points[0].distance(comparisonPoint) < 50) {
      return points[0];
    }
    return comparisonPoint;
  }

  override getNodes(): Node[] {
    return this.lines.flatMap((x) => [x.begin, x.end]);
  }
}
