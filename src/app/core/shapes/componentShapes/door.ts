import { DoorComponent } from "../../../components/shapes/door/door.component";
import { Shape } from "./shape";
import { Node } from "../extendedShape/node";

export class Door extends Shape<DoorComponent> {
  radius: number;
  position: Node;

  constructor(radius: number, position: Node) {
    super(DoorComponent);
    this.radius = radius;
    this.position = position;
  }

  override getNodes(): Node[] {
    return [this.position];
  }
}
