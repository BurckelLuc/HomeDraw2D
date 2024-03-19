import {BasicTool} from "./basicTool";
import {ShapesService} from "../../app/services/shapes.service";
import {Option} from "nochoices";
import {ICommand} from "../../app/commands/ICommand";
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
}
