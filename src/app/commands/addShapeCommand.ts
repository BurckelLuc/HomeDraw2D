import { ICommand } from "./ICommand";
import { ShapesService } from "../services/shapes.service";
import { ToolService } from "../services/tool.service";
import { Shape } from "../core/shapes/componentShapes/shape";

export class AddShapeCommand extends ICommand {
  constructor(
    private shape: Shape,
    shapeService: ShapesService,
  ) {
    super(shapeService);
  }

  execute(): void {
    this.shapeService.addShape(this.shape);
    this.shape.getNodes().forEach((x) => this.shapeService.addOrUpdateNode(x));
    this.shapeService.setCurrentShape(this.shape);
  }

  mergeWithLast(previous: ICommand): ICommand[] {
    return [previous, this];
  }

  undo(): void {
    this.shapeService.deleteShape(this.shape.id);
    this.shape.getNodes().forEach((x) => this.shapeService.removeNode(x.id));
  }
}
