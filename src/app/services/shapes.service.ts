import {EventEmitter, Injectable} from '@angular/core';
import {Shape} from "../../utils/shapes/componentShapes/shape";
import {Point} from "../../utils/shapes/point";
import {Node} from "../../utils/shapes/extendedShape/node";
import {Wall} from "../../utils/shapes/componentShapes/wall";

@Injectable({
  providedIn: 'root'
})
export class ShapesService {
  private shapes : Shape[] = []
  private nodes : Node[] = []

  private hoverShape : Shape | null = null
  private currentShape: Shape | null = null;
  private shapeEmitter : EventEmitter<Shape[]> = new EventEmitter()
  private hoverShapeEmitter: EventEmitter<Shape | null> = new EventEmitter();
  constructor() {
    this.shapeEmitter.subscribe(_ => {
      console.log(this.nodes)
    })
  }

  getShapebyId(id: number) {
    return this.shapes.find(x => x.id == id)!
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.shapeEmitter.emit(this.shapes);
  }

  setCurrentShape(shape: Shape | null) {
    this.currentShape = shape
  }

  setHoverShape(shape: Shape | null) {
    this.hoverShape = shape;
    this.hoverShapeEmitter.emit(this.hoverShape);
  }



  getCurrentShape() {
    return this.currentShape;
  }

  addOrGetPoint(point: Point) : Node {
    let foundNode = this.nodes.find(x => x.x == point.x && x.y == point.y)
    if (foundNode) {
      return foundNode
    }
    let node = Node.fromPoint(point)
    this.nodes.push(node)
    return node;
  }

  getPoints() {
    return this.nodes;
  }

  deleteShape(id: number) {
    this.shapes = this.shapes.filter(x => x.id != id);
    this.shapeEmitter.emit(this.shapes);
  }

  subscribeShapes(callback : (shapes : Shape[]) => void) {
    this.shapeEmitter.subscribe(callback)
  }

  subscribeHoverShape(callback : (hoverShape: Shape | null) => void) {
    this.hoverShapeEmitter.subscribe(callback)
  }

  getClosestWall(clickedPoint: Point): Wall | null {
    let closestWall: Wall | null = null;
    let shortestDistance: number = Number.MAX_VALUE;

    // Iterate over all walls to find the closest one
    for (let wall of this.walls) {
      // Calculate the distance between the clicked point and the wall
      let distance = this.calculateDistance(wall, clickedPoint);

      // Update closestWall if this wall is closer
      if (distance < shortestDistance) {
        closestWall = wall;
        shortestDistance = distance;
      }
    }

    return closestWall;
  }

  // Method to calculate the distance between a wall and a point
  private calculateDistance(wall: Wall, point: Point): number {
    // For simplicity, you can calculate the distance between the point and the wall's center
    // You can also use other methods to calculate the closest distance, such as from a line segment to a point
    return wall.position.distance(point);
  }
}
