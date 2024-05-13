import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Injector,
  Input,
  OnInit,
  Type,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShapeComponent } from "../shapes/shape.component";
import { ShapesService } from "../../services/shapes.service";
import { DynamicModule } from "ng-dynamic-component";
import { ShapeWrapper } from "../../core/shapes/shapeWrapper";
import { ShapesModule } from "../shapes/shapes.module";
import { Shape } from "../../core/shapes/componentShapes/shape";
import { MousePositionService } from "../../services/mouse-position.service";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { ToolService } from "../../services/tool.service";
import { CommandService } from "../../services/command.service";
import { BasicTool } from "../../core/tools/basicTool";
import { DoorTool } from "../../core/tools/doorTool";
import { SelectTool } from "../../core/tools/selectTool";
import { Point } from "../../core/shapes/point";
import { Node } from "../../core/shapes/extendedShape/node";
import { MoveNodeCommand } from "../../commands/moveNodeCommand";
import { WallTool } from "../../core/tools/wallTool";
import { Option } from "nochoices";

@Component({
  selector: "app-canva",
  templateUrl: "./canva.component.html",
  styleUrl: "./canva.component.scss",
})
export class CanvaComponent implements OnInit {
  shapes: ShapeWrapper<ShapeComponent, Shape>[] = [];
  hoverShape: Shape | null = null;
  selectedTool!: Type<BasicTool>;

  constructor(
    protected shapeService: ShapesService,
    private mousePositionService: MousePositionService,
    private toolService: ToolService,
    private commandService: CommandService,
  ) {}

  ngOnInit(): void {
    this.shapeService.subscribeShapes((x) => {
      this.shapes = x.map((y) => new ShapeWrapper(y));
    });
    this.shapeService.subscribeHoverShape((x) => (this.hoverShape = x));
    this.toolService.subscribe((x) => {
      this.selectedTool = x.toolType();
    });
    this.toolService.setTool(WallTool);
  }

  click(e: MouseEvent) {
    e.preventDefault();
    if (e.button == 0) {
      let point = new Point(e.clientX, e.clientY);
      this.toolService
        .getTool()
        .leftClick(point, this.shapeService, Option.None())
        .ifSome((x) => this.commandService.executeCommand(x));
      this.toolService.getTool().hoverGhost(point, this.shapeService);
    }
  }

  @HostListener("window:contextmenu", ["$event"])
  noContext(e: MouseEvent) {
    e.preventDefault();
    this.toolService.getTool().rightClick(this.shapeService);
  }

  @HostListener("mousemove", ["$event"])
  moveMouse(e: MouseEvent) {
    let point: Point = new Point(e.x, e.y);
    this.toolService.getTool().hoverGhost(point, this.shapeService);
    this.mousePositionService.setMousePosition(point);

    if (this.currentPoint) {
      this.currentPoint.x = e.clientX;
      this.currentPoint.y = e.clientY;
    }
  }

  @HostListener("document:keydown.control.z", ["$event"]) undo(
    event: KeyboardEvent,
  ) {
    this.commandService.undo();
  }

  @HostListener("document:keydown.control.y", ["$event"]) redo(
    event: KeyboardEvent,
  ) {
    this.commandService.redo();
  }

  protected readonly SelectTool = SelectTool;

  private currentPoint: Node | null = null;
  private oldNodeBackup: Node | null = null;
  drag($event: MouseEvent, node: Node) {
    switch ($event.type) {
      case "mousedown":
        this.oldNodeBackup = Object.assign({}, node);
        this.currentPoint = this.shapeService.getNodeById(node.id).unwrap();
        break;
      case "mouseup":
        let command = new MoveNodeCommand(
          node,
          this.oldNodeBackup!,
          this.shapeService,
        );
        this.commandService.executeCommand(command);
        this.currentPoint = null;
        this.oldNodeBackup = null;
        break;
    }
  }
}
