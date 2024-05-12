import {BasicTool} from "./basicTool";
import {ShapesService} from "../../services/shapes.service";
import {Option} from "nochoices";
import {Shape} from "../shapes/componentShapes/shape";
import {ICommand} from "../../commands/ICommand";
import {Type} from "@angular/core";
import {Point} from "../shapes/point";
import {Wall} from "../shapes/componentShapes/wall";
import {RemoveShapeCommand} from "../../commands/removeShapeCommand";
import {CombinedCommand} from "../../commands/combinedCommand";

export class EraseTool extends BasicTool {
	hoverGhost(point: Point, shapeService: ShapesService): void {
	}

	leftClick(point: Point, shapeService: ShapesService, clickedOnShape: Option<Shape>): Option<ICommand> {

			if (clickedOnShape.isSome()) {
				return Option.Some(new RemoveShapeCommand(clickedOnShape.unwrap(), shapeService));
			}

		return Option.None();
	}
	override rightClick(shapeService: ShapesService): Option<ICommand> {
		return Option.None();
	}
	override toolType(): Type<EraseTool> {
		return EraseTool;
	}

	override toolName(): string {
		return "Erase";
	}

	override toolIcon(): string {
		return "";
	}
}