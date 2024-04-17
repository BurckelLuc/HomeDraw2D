import {DoorComponent} from "../../../app/shapes/door/door.component";
import {Shape} from "./shape";
import {Point} from "../point";
import {Wall} from "./wall"; // Import the Wall class if not already imported

export class Door extends Shape<DoorComponent> {
  radius: number;
  position: Point;
  rotationAngle: number; // Add rotationAngle property

  constructor(radius: number, position: Point, rotationAngle: number) {
    super(DoorComponent);
    this.radius = radius;
    this.position = position;
    this.rotationAngle = rotationAngle; // Initialize rotationAngle
  }

  // Method to snap the center of the door to the closest point on the wall
  snapToWall(wall: Wall): Point {
    return wall.getClosestPoint(this.position);
  }
}
