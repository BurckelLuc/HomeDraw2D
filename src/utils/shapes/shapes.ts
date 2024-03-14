import {Type} from "@angular/core";
import {ShapeComponent} from "../../app/shapes/shape.component";

export class Shape<A = ShapeComponent> {
  private static _id_generator = 0;

  private _componentType : Type<A>;
  get componentType() {
    return this._componentType;
  }

  private _id;
  get id() {
    return this._id;
  }

  constructor(componentType: Type<A>) {
    this._componentType = componentType;
    this._id = ++Shape._id_generator;
  }

  buildInputs(expand: Record<string, any> = {}) : Record<string, any> {
    return expand;
  }

  extend(shape: Shape) : void {
  }
}

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distance(point: Point): number {
    return Math.sqrt((point.x - this.x)**2 + (point.y - this.y)**2)
  }
}

export class Line {
  begin: Point;
  end: Point;

  constructor(begin: Point, end: Point) {
    this.begin = begin;
    this.end = end;
  }

  public getAngle(): number {
    return Math.atan2(this.end.y - this.begin.y, this.end.x - this.begin.x );
  }
}
