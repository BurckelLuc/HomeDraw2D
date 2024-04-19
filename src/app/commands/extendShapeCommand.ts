import { ICommand } from "./ICommand";
import { ShapesService } from "../services/shapes.service";
import { ToolService } from "../services/tool.service";
import { Shape } from "../core/shapes/componentShapes/shape";
import { Point } from "../core/shapes/point";

export class ExtendShapeCommand extends ICommand {
  constructor(
    private shape: Shape,
    private shapeId: number,
    shapeService: ShapesService,
  ) {
    super(shapeService);
  }

  execute(): void {
    this.shape.getNodes().forEach((x) => this.shapeService.addOrUpdateNode(x));
    this.shapeService.getShapebyId(this.shapeId).extend(this.shape);
    this.shapeService.setCurrentShape(
      this.shapeService.getShapebyId(this.shapeId),
    );
  }

  mergeWithLast(previous: ICommand): ICommand[] {
    return [previous, this];
  }

  undo(): void {
    let highestShape = this.shapeService.getShapebyId(this.shapeId);
    highestShape.unextend(this.shape);

    // Clean Up Additional Nodes
    let extendingPoints = this.shape.getNodes();
    let highestShapePoints = highestShape.getNodes();
    extendingPoints
      .filter((x) => !highestShapePoints.map((x) => x.id).includes(x.id))
      .forEach((x) => this.shapeService.removeNode(x.id));

    this.shapeService.setCurrentShape(null);
  }
}
