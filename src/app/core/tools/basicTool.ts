import { Shape } from "../shapes/componentShapes/shape";
import { ShapesService } from "../../services/shapes.service";
import { Type } from "@angular/core";
import { ICommand } from "../../commands/ICommand";
import { Option } from "nochoices";
import { Point } from "../shapes/point";

export abstract class BasicTool {
  currentPoint: Point | null = null;
  hoverPoint: Point | null = null;

  // Functionalities
  abstract leftClick(
    clickedPoint: Point,
    shapeService: ShapesService,
    clickedOnShape: Option<Shape>,
  ): Option<ICommand>;
  abstract rightClick(shapeService: ShapesService): Option<ICommand>;
  abstract hoverGhost(point: Point, shapeService: ShapesService): void;

  // Utils
  abstract toolType(): Type<BasicTool>;
  abstract toolName(): string;
  abstract toolIcon(): string;
}
