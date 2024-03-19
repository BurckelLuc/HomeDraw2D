import {EventEmitter, Injectable} from '@angular/core';
import {Shape} from "../../utils/shapes/componentShapes/shape";
import {Point} from "../../utils/shapes/point";

@Injectable({
  providedIn: 'root'
})
export class MousePositionService {

  private mousePosition!: Point;
  private mousePotisitionEmitter: EventEmitter<Point> = new EventEmitter<Point>();
  constructor() { }

  setMousePosition(point: Point) {
    this.mousePosition = point;
    this.mousePotisitionEmitter.emit(point)
  }

  subscribe(callback : (point : Point) => void) {
    this.mousePotisitionEmitter.subscribe(callback)
  }
}
