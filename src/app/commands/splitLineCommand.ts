import { Wall } from "../core/shapes/componentShapes/wall";
import { Node } from "../core/shapes/extendedShape/node";
import { Line } from "../core/shapes/line";
import { ShapesService } from "../services/shapes.service";
import { ICommand } from "./ICommand";

export class SplitLineCommand extends ICommand {
  private splittedWalls: Wall[] = [];

  constructor(
    private line: Line,
    private node: Node,
    private wall: Wall,
    shapeService: ShapesService,
  ) {
    super(shapeService);
    this.splittedWalls = [
      new Wall(this.line.begin, this.node),
      new Wall(this.node, this.line.end),
    ];
  }

  override execute(): void {
    this.shapeService.addOrUpdateNode(this.node);
    this.shapeService.deleteShape(this.wall.id);
    this.splittedWalls.forEach(x => this.shapeService.addShape(x))
  }

  override undo(): void {
    this.splittedWalls.forEach(x => this.shapeService.deleteShape(x.id));
    this.shapeService.removeNode(this.node.id);
    this.shapeService.addShape(this.wall);
  }

  mergeWithLast(previous: ICommand): ICommand[] {
    return [previous, this];
  }
}
