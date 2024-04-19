import {BasicTool} from "./basicTool";
import {ShapesService} from "../../services/shapes.service";
import {Option} from "nochoices";
import {ICommand} from "../../commands/ICommand";
import {Type} from "@angular/core";
import {Point} from "../shapes/point";
import {Line} from "../shapes/line";

export class SelectTool extends BasicTool {
	override leftClick(clickedPoint: Point) : Option<ICommand> {
		return Option.None();
	}


  hoverGhost(point: Point, shapeService: ShapesService): any {
  }

  rightClick(shapeService: ShapesService): Option<ICommand> {
    return Option.None()
  }

  override toolType(): Type<SelectTool> {
    return SelectTool
  }

  override toolName(): string {
    return "Select";
  }

  override toolIcon(): string {
    return "M 16.453125 22.082031 C 16.050781 23.148438 22.070312 40.972656 29.691406 61.589844 C 42.667969 96.179688 44.003906 99.105469 46.8125 99.105469 C 49.753906 99.105469 50.558594 97.507812 55.507812 81.8125 L 60.855469 64.652344 L 78.242188 59.195312 C 94.160156 54.273438 95.632812 53.476562 95.632812 50.550781 C 95.632812 47.625 92.824219 46.425781 58.851562 33.789062 C 38.652344 26.207031 21 20.085938 19.660156 20.085938 C 18.324219 19.953125 16.984375 20.886719 16.453125 22.082031 Z M 16.453125 22.082031";
  }
}
