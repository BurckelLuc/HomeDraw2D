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

export interface Point {
  x: any;
  y: any;
}

export interface Line {
  begin: Point;
  end: Point;
}
