import { Shape } from "./shape";
import { WallComponent } from "../../../components/shapes/wall/wall.component";
import { Point } from "../point";
import { Node } from "../extendedShape/node";
import { Line } from "../line";

export class Wall extends Shape<WallComponent> {
  lines: Line[] = [];

  constructor(begin: Node, end: Node) {
    super(WallComponent);
    let line: Line = new Line(begin, end);
    this.lines.push(line);
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
