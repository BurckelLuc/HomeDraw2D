import { ShapesService } from "../services/shapes.service";
import { ICommand } from "./ICommand";

export class CombinedCommand extends ICommand {
  constructor(
    private commands: Array<ICommand>,
    shapeService: ShapesService,
  ) {
    super(shapeService);
  }

  override execute(): void {
    this.commands.forEach((x) => x.execute());
  }

  override undo(): void {
    this.commands
      .map((x) => x)
      .reverse()
      .forEach((x) => x.undo());
  }

  override mergeWithLast(previous: ICommand): ICommand[] {
    return [previous, this];
  }
}
