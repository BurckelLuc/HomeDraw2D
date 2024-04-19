import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShapeComponent } from "../shape.component";
import { Door } from "../../../core/shapes/componentShapes/door";
import { Shape } from "../../../core/shapes/componentShapes/shape";
import { ToolService } from "../../../services/tool.service";
import { ShapesService } from "../../../services/shapes.service";
import {Point} from "../../../core/shapes/point";

@Component({
  selector: "app-door",
  templateUrl: "./door.component.html",
  styleUrl: "./door.component.scss",
})
export class DoorComponent extends ShapeComponent {
  @ViewChild("template", { static: true }) template: any;

  @Input()
  override _shape!: Shape<ShapeComponent>;

  @Input("isGhost")
  isGhost: boolean = false;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private toolService: ToolService,
    private shapesService: ShapesService,
  ) {
    super(_viewContainerRef);
  }

  get shape(): Door {
    return this._shape as Door;
  }

  override onHover(event: MouseEvent): void {
    let point = new Point(event.clientX, event.clientY);
    this.toolService.getTool().hoverGhost(point, this.shapesService);
  }
  override onClick(event: MouseEvent): void {}

  ngOnInit() {
    this._viewContainerRef.createEmbeddedView(this.template);
  }

  buildString() {
    let r = this.shape.radius;
    let { x, y } = this.shape.position;
    return `M${x},${y} A${r},${r} 0 0 1 ${x + r},${y + r} L${x},${y + r} L${x},${y}`;
  }

  buildTransform() {
    let transformations = [];
    transformations.push(
      `translate(${-this.shape.radius / 2},${-this.shape.radius})`,
    );
    transformations.push(
      `rotate(${this.shape.position.x},${-this.shape.radius / 2},${-this.shape.radius})`,
    );
    return transformations.join(";");
  }
}
