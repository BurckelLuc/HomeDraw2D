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

  buildInputs() : Record<string, any> {
    return {};
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

export interface Line {
  begin: Point;
  end: Point;
}
