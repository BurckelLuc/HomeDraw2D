import {ShapesService} from "../services/shapes.service";
import {ToolService} from "../services/tool.service";

export abstract class ICommand {
  public constructor(protected shapeService: ShapesService){

  }

  abstract execute() : void
  abstract undo(): void
  abstract mergeWithLast(previous: ICommand): ICommand[]
}
