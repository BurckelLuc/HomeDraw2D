import {EventEmitter, Injectable} from '@angular/core';
import {ShapeComponent} from "../shapes/shape.component";
import {Shape} from "../../utils/shapes/shapes";

@Injectable({
  providedIn: 'root'
})
export class ShapesService {
  private shapes : Shape[] = []
  private currentShape: Shape | null = null;
  private shapeEmitter : EventEmitter<Shape[]> = new EventEmitter()

  constructor() {
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.shapeEmitter.emit(this.shapes);
  }

  setCurrentShape(shape: Shape | null) {
    this.currentShape = shape
  }

  getCurrentShape() {
    return this.currentShape;
  }

  deleteShape(id: number) {
    this.shapes = this.shapes.filter(x => x.id != id);
    this.shapeEmitter.emit(this.shapes);
  }

  subscribe(callback : (shapes : Shape[]) => void) {
    this.shapeEmitter.subscribe(callback)
  }

}
