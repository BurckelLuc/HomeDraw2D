import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { ShapeComponent } from "../shape.component";
import { Wall } from "../../../core/shapes/componentShapes/wall";
import { Shape } from "../../../core/shapes/componentShapes/shape";
import { ToolService } from "../../../services/tool.service";
import { ShapesService } from "../../../services/shapes.service";
import { CommandService } from "../../../services/command.service";
import { Point } from "../../../core/shapes/point";
import { Node } from "../../../core/shapes/extendedShape/node";
import { Line } from "../../../core/shapes/line";
import { Option } from "nochoices";

@Component({
  selector: "app-wall",
  templateUrl: "./wall.component.html",
  styleUrl: "./wall.component.scss",
})
export class WallComponent extends ShapeComponent implements OnInit {
  @Input()
  override _shape!: Shape;

  @Input("isGhost")
  isGhost: boolean = false;
  isCoteVisible: number = 1;

  get shape(): Wall {
    return this._shape as Wall;
  }

  @HostListener("document:keydown.x") toggleToolBox() {
    this.isCoteVisible ^= 1;
  }

  @ViewChild("template", { static: true }) template: any;

  @ViewChild("path") path!: ElementRef<SVGPathElement>;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private toolService: ToolService,
    private shapesService: ShapesService,
    private commandService: CommandService,
  ) {
    super(_viewContainerRef);
  }

  onClick(event: MouseEvent): void {
    if (this.isGhost) return;
    event.stopPropagation();
    if (event.button == 0) {
      let clickedPoint = new Point(event.clientX, event.clientY);
      let pathPoint = this.getPathPoint(clickedPoint);
      this.findLine(pathPoint);
      let closestPoint = this.shape.getClosestPoint(pathPoint);
      this.toolService
        .getTool()
        .leftClick(closestPoint, this.shapesService, Option.Some(this.shape))
        .ifSome((x) => this.commandService.executeCommand(x));
    }
  }

  getPathPoint(point: Point): Point {
    console.log(this.path);
    var startPoint = this.path.nativeElement.getPointAtLength(0);
    var minDistance = Math.sqrt(
      (point.x - startPoint.x) ** 2 + (point.y - startPoint.y) ** 2,
    );

    let domPoint = this.path.nativeElement.getPointAtLength(minDistance);
    return new Point(domPoint.x, domPoint.y);
  }

  findLine(point: Point) {
    let lines = this.shape.lines.map((x) => x);
    let node = Node.fromPoint(point);
    lines.sort((x, y) => x.calculateLineDiff(node) - y.calculateLineDiff(node));
    return lines[0];
  }

  onHover(event: MouseEvent): void {}

  protected getCoteX(line: Line) {
    let x = (line.begin.x + line.end.x) / 2;
    let xPoint = line.normalizeAngleX();
    return x - 10 + 30 * xPoint;
  }

  protected getCoteY(line: Line) {
    let y = (line.begin.y + line.end.y) / 2;
    let yPoint = line.normalizeAngleY();
    return y + yPoint * 30;
  }

  buildString() {
    let p = this.shape.lines[0].begin;
    let stringBuilder = [``];
    stringBuilder = stringBuilder.concat(
      this.shape.lines.map(
        (x) => `M${x.begin.x},${x.begin.y} L${x.end.x},${x.end.y}`,
      ),
    );
    return stringBuilder.join(" ");
  }

  ngOnInit() {
    this._viewContainerRef.createEmbeddedView(this.template);
  }
}
