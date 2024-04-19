import { ICommand } from "./ICommand";
import { ShapesService } from "../services/shapes.service";
import { Node } from "../core/shapes/extendedShape/node";

export class MoveNodeCommand extends ICommand {
  private newPosition: Node;
  constructor(
    private node: Node,
    private oldPosition: Node,
    shapeService: ShapesService,
  ) {
    super(shapeService);
    this.newPosition = Object.assign({}, node);
  }

  execute(): void {
    this.node.x = this.newPosition.x;
    this.node.y = this.newPosition.y;
    console.log(this.shapeService.getNodes());
  }

  mergeWithLast(previous: ICommand): ICommand[] {
    return [previous, this];
  }

  undo(): void {
    this.node.x = this.oldPosition.x;
    this.node.y = this.oldPosition.y;
  }
}
