import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { ShapeComponent } from "../shape.component";
import { Wall } from "../../../utils/shapes/wall";
import { Line, Point, Shape } from "../../../utils/shapes/shapes";
import { ToolService } from "../../services/tool.service";
import { ShapesService } from "../../services/shapes.service";

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

  get shape(): Wall {
    return this._shape as Wall;
  }

  @ViewChild("template", { static: true }) template: any;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private toolService: ToolService,
    private shapesService: ShapesService,
  ) {
    super(_viewContainerRef);
  }

  onClick(event: MouseEvent): void {
    if (this.isGhost) return;
    event.stopPropagation();
    if (event.button == 0) {
      let clickedPoint = new Point(event.clientX, event.clientY);
      let closestPoint = this.shape.getClosestPoint(clickedPoint);
      this.toolService
        .getTool()
        .leftClick(closestPoint, this.shapesService, true);
    }
  }

  onHover(event: MouseEvent): void {}

  protected getCoteX(line: Line) {
    let x = (line.begin.x + line.end.x) / 2;
    let xPoint = Math.cos(90);
    return x + 100 * xPoint;
  }

  protected getCoteY(line: Line) {
    let y = (line.begin.y + line.end.y) / 2;
    let yPoint = Math.cos(90);
    return y + yPoint * 100;
  }

  protected getCote(line: Line) {
    return Math.round(
      Math.sqrt(
        Math.abs(line.begin.x - line.end.x) ** 2 +
          Math.abs(line.end.y - line.begin.y) ** 2,
      ),
    );
  }

  buildString() {
    let p = this.shape.lines[0].begin;
    let stringBuilder = [`M${p.x},${p.y}`];
    stringBuilder = stringBuilder.concat(
      this.shape.lines.map((x) => x.end).map((p) => `L${p.x},${p.y}`),
    );
    return stringBuilder.join(" ");
  }

  ngOnInit() {
    this._viewContainerRef.createEmbeddedView(this.template);
  }
}
