export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distance(point: Point): number {
    return Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2)
  }
}
