import { DoorComponent } from "../../app/shapes/door/door.component";
import { Point, Shape } from "./shapes";

export class Door extends Shape<DoorComponent> {
  radius: number;
  position: Point;

  constructor(radius: number, position: Point) {
    super(DoorComponent);
    this.radius = radius;
    this.position = position;
  }
}
