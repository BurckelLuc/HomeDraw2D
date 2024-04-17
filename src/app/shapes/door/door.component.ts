import {Component, Input, ViewChild, ViewContainerRef} from "@angular/core";
import {ShapeComponent} from "../shape.component";
import {Door} from "../../../utils/shapes/componentShapes/door";
import {ToolService} from "../../services/tool.service";
import {ShapesService} from "../../services/shapes.service";
import {Point} from "../../../utils/shapes/point";
import {Wall} from "../../../utils/shapes/componentShapes/wall"; // Import the Wall class if not already imported

@Component({
  selector: "app-door",
  templateUrl: "./door.component.html",
  styleUrls: ["./door.component.scss"],
})
export class DoorComponent extends ShapeComponent {
  @ViewChild("template", { static: true }) template: any;

  @Input()
  override _shape!: Door;

  @Input("isGhost")
  isGhost: boolean = false;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private toolService: ToolService,
    private shapesService: ShapesService
  ) {
    super(_viewContainerRef);
  }

  override onHover(event: MouseEvent): void {
    let point = new Point(event.clientX, event.clientY);
    this.toolService.getTool().hoverGhost(point, this.shapesService);
  }

  override onClick(event: MouseEvent): void {
    if (this.isGhost) return;
    event.stopPropagation();
    if (event.button== 0) {
      let clickedPoint = new Point(event.clientX, event.clientY);
      let wall: Wall = this.shapesService.getClosestWall(clickedPoint); // Get the wall object from the shapes service
      // Update the position of the door to the closest point on the wall
      this._shape.position = this._shape.snapToWall(wall);
    }
  }

  ngOnInit() {
    this._viewContainerRef.createEmbeddedView(this.template);
  }

  buildString(): string {
    let r = this._shape.radius;
    let { x, y } = this._shape.position;
    return `M${x},${y} A${r},${r} 0 0 1 ${x + r},${y + r} L${x},${y + r} L${x},${y}`;
  }

  buildTransform(): string {
    return `translate(${-this._shape.radius / 2},${-this._shape.radius}) rotate(${this._shape.rotationAngle},${this._shape.position.x},${this._shape.position.y})`;
  }
}
