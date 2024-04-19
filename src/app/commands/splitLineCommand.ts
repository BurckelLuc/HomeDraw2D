import { Shape } from "../core/shapes/componentShapes/shape";
import { Wall } from "../core/shapes/componentShapes/wall";
import { Node } from "../core/shapes/extendedShape/node";
import { Line } from "../core/shapes/line";
import { ShapesService } from "../services/shapes.service";
import { ICommand } from "./ICommand";

export class SplitLineCommand extends ICommand {
  private splitted: Line[] = [];

  constructor(
    private line: Line,
    private node: Node,
    private wall: Wall,
    shapeService: ShapesService,
  ) {
    super(shapeService);
    this.splitted = [
      new Line(this.line.begin, this.node),
      new Line(this.node, this.line.end),
    ];
  }

  override execute(): void {
    this.shapeService.addOrUpdateNode(this.node);
    this.wall.lines = this.wall.lines
      .filter((x) => x != this.line)
      .concat(this.splitted);
  }

  override undo(): void {
    this.wall.lines = this.wall.lines
      .filter((x) => !this.splitted.includes(x))
      .concat([this.line]);
    this.shapeService.removeNode(this.node.id);
  }

  mergeWithLast(previous: ICommand): ICommand[] {
    return [previous, this];
  }
}
