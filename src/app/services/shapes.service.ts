import { EventEmitter, Injectable } from "@angular/core";
import { Shape } from "../core/shapes/componentShapes/shape";
import { Point } from "../core/shapes/point";
import { Node } from "../core/shapes/extendedShape/node";
import { Option } from "nochoices";

@Injectable({
  providedIn: "root",
})
export class ShapesService {
  private shapes: Shape[] = [];
  private nodes: Node[] = [];

  private hoverShape: Shape | null = null;
  private currentShape: Shape | null = null;
  private shapeEmitter: EventEmitter<Shape[]> = new EventEmitter();
  private hoverShapeEmitter: EventEmitter<Shape | null> = new EventEmitter();

  constructor() {}

  getShapebyId(id: number) {
    return this.shapes.find((x) => x.id == id)!;
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.shapeEmitter.emit(this.shapes);
  }

  setCurrentShape(shape: Shape | null) {
    this.currentShape = shape;
  }

  setHoverShape(shape: Shape | null) {
    this.hoverShape = shape;
    this.hoverShapeEmitter.emit(this.hoverShape);
  }

  getCurrentShape() {
    return this.currentShape;
  }

  addOrUpdateNode(node: Node) {
    this.nodes = this.nodes.filter((x) => x.id != node.id);
    this.nodes.push(node);
    return node;
  }

  getNodeById(nodeId: Number): Option<Node> {
    let x = this.nodes.find((x) => x.id == nodeId);
    if (x) return Option.Some(x);
    return Option.None();
  }

  addPointAsNode(point: Point): Node {
    let foundNode = this.nodes.find((x) => x.x == point.x && x.y == point.y);
    if (foundNode) {
      return foundNode;
    }
    let node = Node.fromPoint(point);
    this.nodes.push(node);
    return node;
  }

  removeNode(nodeId: number) {
    let usedBy = this.shapes
      .flatMap((x) => x.getNodes())
      .map((x) => this.addPointAsNode(x))
      .filter((x) => x.id == nodeId).length;

    if (usedBy == 0) this.nodes = this.nodes.filter((x) => x.id != nodeId);
  }

  getNodes() {
    return this.nodes;
  }

  deleteShape(id: number) {
    this.shapes = this.shapes.filter((x) => x.id != id);
    this.shapeEmitter.emit(this.shapes);
  }

  subscribeShapes(callback: (shapes: Shape[]) => void) {
    this.shapeEmitter.subscribe(callback);
  }

  subscribeHoverShape(callback: (hoverShape: Shape | null) => void) {
    this.hoverShapeEmitter.subscribe(callback);
  }
}
