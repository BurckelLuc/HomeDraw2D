import {Component, HostListener, Injector, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicTool} from "../../utils/tools/basicTool";
import {WallTool} from "../../utils/tools/wallTool";
import * as isect from "isect";
import {ShapeComponent} from "../shapes/shape.component";
import {ShapesService} from "../services/shapes.service";
import {WallComponent} from "../shapes/wall/wall.component";
import {DynamicModule} from "ng-dynamic-component";
import {ShapeWrapper} from "../../utils/shapes/shapeWrapper";
import {Wall} from "../../utils/shapes/wall";
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

  shiftPressed = false;

  shapes: ShapeWrapper<ShapeComponent, Shape>[] = []
  hoverShape: Shape | null = null;

  constructor(private shapeService: ShapesService, private mousePositionService: MousePositionService, private toolService: ToolService) {
    this.shapeService.subscribe(x => {
      this.shapes = x.map(y => new ShapeWrapper(y))
    })
  }

  ngOnInit(): void {
  }

  click(e : MouseEvent) {
    e.preventDefault()
    if (e.button == 0) {
      let point = new Point(e.clientX, e.clientY)
      this.toolService.getTool().leftClick(point, this.shapeService, false)
      this.hoverShape = this.toolService.getTool().hoverGhost(point);
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
    this.hoverShape = this.toolService.getTool().hoverGhost(point);
    this.mousePositionService.setMousePosition(point)
  }


  protected readonly ShapeComponent = ShapeComponent;
  protected readonly Wall = Wall;
}
