import {Component, HostListener, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {Tools} from "../../utils/tools";
import {BasicTool} from "../../utils/tools/basicTool";
import {LineTool} from "../../utils/tools/lineTool";
import * as isect from "isect";

interface Point {
  x: number,
  y: number
}

interface Line {
  begin: Point,
  end: Point
}


@Component({
  selector: 'app-canva',
  standalone: true,
  imports: [CommonModule, ToolbarComponent],
  templateUrl: './canva.component.html',
  styleUrl: './canva.component.scss'
})
export class CanvaComponent {

  shiftPressed = false;

  @Input()
  selectedTool: BasicTool = new LineTool();

  @HostListener('document:keydown.control.z') undo() {
    let x = this.lines.pop();
    if (x) this.discarded.push(x);
    this.currentPoint = null;
  }

  @HostListener('document:keydown.control.y') redo() {
    let x = this.discarded.pop()
    if (x) this.lines.push(x)
    this.currentPoint = null
  }

  @HostListener('document:keyup.shift') unpressedShift() {
    this.shiftPressed = false;
  }


  @HostListener("document:keydown.shift") pressedShift() {
    this.shiftPressed = true;
  }

  snapAxis(point: Point) {
    if (!this.currentPoint) return;

    let vert = Math.abs(this.currentPoint!.x - point.x);
    let hori = Math.abs(this.currentPoint!.y - point.y);
    if (vert < hori) {
      this.hoverPoint = { x: this.currentPoint.x, y: point.y};
    } else {
      this.hoverPoint = { x: point.x, y: this.currentPoint.y};
    }
  }


  discarded : Line[] = [];
  lines : Line[] = [];
  snapPoints: Point[] = [];
  currentPoint : Point | null = null;
  hoverPoint: Point | null = null;

  click(event: MouseEvent) {
    if (event.button == 0) {
      if (this.currentPoint) {
        let newPoint: Point = this.hoverPoint ?? {x: event.clientX, y: event.clientY};
        this.lines.push({begin: this.currentPoint, end: newPoint});

        this.calculateSnapPoints();

        this.currentPoint = newPoint;
        this.discarded = []
      } else {
        this.currentPoint = this.hoverPoint ?? { x: event.clientX, y: event.clientY}
      }
    }
  }

  calculateSnapPoints() {
    let x = this.lines.map(x => {return {from: {x: x.begin.x, y: x.begin.y}, to: {x: x.end.x, y: x.end.y}}});
    let sweep = isect.sweep(x, {});
    let result = sweep.run();
    let possiblesPoints: [number, number][] = result.map((x:{point: Point}) => [x.point.x, x.point.y]).concat(this.lines.map(x => [[x.begin.x, x.begin.y], [x.end.x, x.end.y]]).flat())
    this.snapPoints = [...new Set(possiblesPoints)].map((z: [number, number]) => {
      return {x: z[0], y: z[1]}
    });
  }

  onToolChange(tool: Tools) {
    console.log(tool);
    this.selectedTool = Tools.getTool(tool);
  }

  rightclick(event: MouseEvent) {
    event.preventDefault();
    this.currentPoint = null;
  }

  moveMouse(event: MouseEvent) {
    let point: Point = { x: event.clientX, y: event.clientY }
    if (this.shiftPressed) {
      this.snapAxis(point);
    } else {
      this.hoverPoint = this.trySnap(point);
    }
  }


  distance(a: Point, b : Point) {
    return ((a.x - b.x)**2 + (a.y - b.y)**2)**0.5
  }

  trySnap(position: Point) : Point {
    let closest = this.snapPoints.filter(x => this.distance(x, position) < 20);
    if (closest.length > 0) return closest[0];
    return position;
  }

}
