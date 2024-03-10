import {Component, HostListener, Injector, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {Tools} from "../../utils/tools";
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

  @Input()
  selectedTool: BasicTool = new WallTool();

  constructor(private shapeService: ShapesService, private mousePositionService: MousePositionService) {
    this.shapeService.subscribe(x => {
      this.shapes = x.map(y => new ShapeWrapper(y))
    })

  }

  ngOnInit(): void {
  }

  click(e : MouseEvent) {
    e.preventDefault()
    let res = this.selectedTool.click(e, this.shapeService)
    this.hoverShape = this.selectedTool.hoverGhost(e);
    if (res instanceof Shape) {
      this.shapeService.addShape(res);
    }
  }

  @HostListener('window:contextmenu', ['$event'])
  noContext(e : MouseEvent) {
    e.preventDefault()
  }

  @HostListener('mousemove', ['$event'])
  moveMouse(e: MouseEvent) {
    let point : Point = {x: e.x, y: e.y};
    this.hoverShape = this.selectedTool.hoverGhost(e);
    this.mousePositionService.setMousePosition(point)
  }


  protected readonly ShapeComponent = ShapeComponent;
  protected readonly Wall = Wall;
}
