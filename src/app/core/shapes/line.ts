import { Node } from "./extendedShape/node";

export class Line {
  begin: Node;
  end: Node;

  constructor(begin: Node, end: Node) {
    this.begin = begin;
    this.end = end;
  }

  public getAngle(): number {
    return Math.atan2(this.end.y - this.begin.y, this.end.x - this.begin.x);
  }

  public calculateLineDiff(point: Node) {
    let a = new Line(Node.fromPoint(point), this.begin);
    let b = new Line(Node.fromPoint(point), this.end);
    return a.getCote() + b.getCote() - this.getCote();
  }

  public getCote() {
    return Math.round(
      Math.sqrt(
        Math.abs(this.begin.x - this.end.x) ** 2 +
          Math.abs(this.end.y - this.begin.y) ** 2,
      ),
    );
  }
}
