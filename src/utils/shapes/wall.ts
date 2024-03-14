import {Line, Point, Shape} from "./shapes";
import {WallComponent} from "../../app/shapes/wall/wall.component";
import {Type} from "@angular/core";

export class Wall extends Shape<WallComponent> {

  lines: Line[] = []

  constructor(begin: Point, end: Point) {
    super(WallComponent);
    let line: Line = new Line(begin, end);
    this.lines.push(line);
  }

  override extend(shape: Shape): void {
    if (shape.componentType == WallComponent) {
      let wall= shape as unknown as Wall;
      this.lines.push(wall.lines[0]);
    }
  }

  getClosestPoint(comparisonPoint : Point) : Point{
    let points = [this.lines[0].begin].concat(this.lines.map(x => x.end))
    points.sort((a, b) => a.distance(comparisonPoint) - b.distance(comparisonPoint))
    if (points.length && points[0].distance(comparisonPoint) < 50) {
      return points[0];
    }
    return comparisonPoint;
  }
}
