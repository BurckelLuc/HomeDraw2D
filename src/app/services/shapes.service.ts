import {EventEmitter, Injectable} from '@angular/core';
import {Shape} from "../../utils/shapes/shapes";

@Injectable({
  providedIn: 'root'
})
export class ShapesService {
  private shapes : Shape[] = []
  private hoverShape : Shape | null = null
  private currentShape: Shape | null = null;
  private shapeEmitter : EventEmitter<Shape[]> = new EventEmitter()
  private hoverShapeEmitter: EventEmitter<Shape | null> = new EventEmitter();
  constructor() {
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

}
