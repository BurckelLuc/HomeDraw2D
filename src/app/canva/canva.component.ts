import {Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Point {
  x: number,
  y: number
};

interface Line {
  begin: Point,
  end: Point
}


@Component({
  selector: 'app-canva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canva.component.html',
  styleUrl: './canva.component.scss'
})
export class CanvaComponent {

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


  discarded : Line[] = [];
  lines : Line[] = [];
  currentPoint : Point | null = null;
  hoverPoint: Point | null = null;

  click(event: MouseEvent) {
    if (event.button == 0) {
      if (this.currentPoint) {
        let newPoint: Point = {x: event.clientX, y: event.clientY};
        this.lines.push({begin: this.currentPoint, end: newPoint});
        this.currentPoint = newPoint;
        this.discarded = []
      } else {
        this.currentPoint = { x: event.clientX, y: event.clientY}
      }
    }
  }

  rightclick(event: MouseEvent) {
    event.preventDefault();
    this.currentPoint = null;
  }

  moveMouse(event: MouseEvent) {
    this.hoverPoint = { x: event.clientX, y: event.clientY }
  }

}
