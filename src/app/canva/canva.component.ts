import {ChangeDetectorRef, Component, HostListener, Injector, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShapeComponent} from "../shapes/shape.component";
import {ShapesService} from "../services/shapes.service";
import {DynamicModule} from "ng-dynamic-component";
import {ShapeWrapper} from "../../utils/shapes/shapeWrapper";
import {ShapesModule} from "../shapes/shapes.module";
import {Point, Shape} from "../../utils/shapes/shapes";
import {MousePositionService} from "../services/mouse-position.service";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ToolService} from "../services/tool.service";


@Component({
  selector: 'app-canva',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, DynamicModule, ShapesModule],
  templateUrl: './canva.component.html',
  styleUrl: './canva.component.scss'
})
export class CanvaComponent implements OnInit {

  shapes: ShapeWrapper<ShapeComponent, Shape>[] = []
  hoverShape: Shape | null = null;

  constructor(private shapeService: ShapesService, private mousePositionService: MousePositionService, private toolService: ToolService) {
  }

  ngOnInit(): void {
    this.shapeService.subscribeShapes(x => {
      this.shapes = x.map(y => new ShapeWrapper(y))
    })
    this.shapeService.subscribeHoverShape((x) => this.hoverShape = x)
  }

  click(e : MouseEvent) {
    e.preventDefault()
    if (e.button == 0) {
      let point = new Point(e.clientX, e.clientY)
      this.toolService.getTool().leftClick(point, this.shapeService, false)
      this.toolService.getTool().hoverGhost(point, this.shapeService)
    }
  }

  @HostListener('window:contextmenu', ['$event'])
  noContext(e : MouseEvent) {
    e.preventDefault()
    this.toolService.getTool().rightClick(this.shapeService)
  }

  @HostListener('mousemove', ['$event'])
  moveMouse(e: MouseEvent) {
    let point : Point = new Point(e.x, e.y);
    this.toolService.getTool().hoverGhost(point, this.shapeService)
    this.mousePositionService.setMousePosition(point)
  }
}
