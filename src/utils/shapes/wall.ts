import {Line, Point, Shape} from "./shapes";
import {WallComponent} from "../../app/shapes/wall/wall.component";
import {Type} from "@angular/core";

export class Wall extends Shape<WallComponent> {

  lines: Line[] = []

  constructor(begin: Point, end: Point) {
    super(WallComponent);
    let line: Line = {begin, end};
    this.lines.push(line);
  }

  override extend(shape: Shape): void {
    if (shape.componentType == WallComponent) {
      let wall= shape as unknown as Wall;
      this.lines.push(wall.lines[0]);
    }

  }
}
