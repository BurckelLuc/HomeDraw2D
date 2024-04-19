import {ShapeComponent} from "../../components/shapes/shape.component";
import {Shape} from "./componentShapes/shape";
import {Type} from "@angular/core";

export class ShapeWrapper<U = ShapeComponent, T = Shape<U>> {
  component: Type<U>;
  shape: T
  constructor(shape: T) {
    this.component = (shape as Shape<U>).componentType;
    this.shape = shape;
  }

  buildInput() {
    return {
      _shape: this.shape
    }
  }

}
