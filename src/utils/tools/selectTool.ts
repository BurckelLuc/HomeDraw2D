import {BasicTool} from "./basicTool";
import {Line, Point} from "../shapes/shapes";
import {ShapesService} from "../../app/services/shapes.service";
import {Option} from "nochoices";
import {ICommand} from "../../app/commands/ICommand";

export class SelectTool extends BasicTool {
	override leftClick(clickedPoint: Point) : Option<ICommand> {
		return Option.None();
	}


  hoverGhost(point: Point, shapeService: ShapesService): any {
  }

  rightClick(shapeService: ShapesService): Option<ICommand> {
    return Option.None()
  }
}
