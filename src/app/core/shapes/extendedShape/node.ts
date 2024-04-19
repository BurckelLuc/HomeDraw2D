import { Point } from "../point";

export class Node extends Point {
  private static _id_counter = 1;
  private _id: number;

  get id() {
    return this._id;
  }

  constructor(x: number, y: number) {
    super(x, y);
    this._id = Node._id_counter++;
  }

  static fromPoint(point: Point) {
    return new Node(point.x, point.y);
  }
}
