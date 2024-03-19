import {Point} from "../point";

export class Node extends Point {
  private static _id_counter = 1;
  private id : number;

  constructor(x : number, y: number) {
    super(x, y);
    this.id = Node._id_counter++;
  }

  static fromPoint(point: Point) {
    return new Node(point.x, point.y);
  }

}
