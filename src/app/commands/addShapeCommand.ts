import {ICommand} from "./ICommand";
import {ShapesService} from "../services/shapes.service";
import {ToolService} from "../services/tool.service";
import {Shape} from "../../utils/shapes/componentShapes/shape";

export class AddShapeCommand extends ICommand {
  constructor(private shape: Shape, shapeService: ShapesService, ) {
    super(shapeService);
  }

  execute(): void {

    this.shapeService.addShape(this.shape);
    this.shapeService.setCurrentShape(this.shape)

  }

  mergeWithLast(previous: ICommand): ICommand[] {
    return [previous, this]
  }

  undo(): void {
    this.shapeService.deleteShape(this.shape.id);
  }

}
