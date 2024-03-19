import {ICommand} from "./ICommand";
import {ShapesService} from "../services/shapes.service";
import {ToolService} from "../services/tool.service";
import {Shape} from "../../utils/shapes/componentShapes/shape";
import {Point} from "../../utils/shapes/point";

export class ExtendShapeCommand extends ICommand {
  constructor(private shape: Shape, private shapeId: number, shapeService: ShapesService) {
    super(shapeService);
  }

  execute(): void {
    this.shapeService.getShapebyId(this.shapeId).extend(this.shape)
    this.shapeService.setCurrentShape(this.shapeService.getShapebyId(this.shapeId));
  }

  mergeWithLast(previous: ICommand): ICommand[] {
    return [previous, this]
  }

  undo(): void {
    this.shapeService.getShapebyId(this.shapeId).unextend(this.shape)
    this.shapeService.setCurrentShape(null);
  }

}
