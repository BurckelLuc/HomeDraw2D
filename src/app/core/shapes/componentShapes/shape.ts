import { Type } from "@angular/core";
import { ShapeComponent } from "../../../components/shapes/shape.component";
import { Node } from "../extendedShape/node";

export class Shape<A = ShapeComponent> {
  private static _id_generator = 0;

  private _componentType: Type<A>;
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

  buildInputs(expand: Record<string, any> = {}): Record<string, any> {
    return expand;
  }

  getNodes(): Node[] {
    return [];
  }
}
