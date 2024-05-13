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
		return "M 66.703125 9.855469 C 65.277344 10.582031 24.398438 58.988281 23.53125 60.984375 C 22.742188 62.800781 22.628906 66.039062 23.289062 67.933594 C 23.558594 68.710938 25.835938 71.652344 29.753906 76.300781 L 35.796875 83.472656 L 21.90625 83.472656 C 9.777344 83.472656 7.941406 83.535156 7.410156 83.976562 C 6.753906 84.519531 6.613281 85.695312 7.132812 86.308594 C 7.609375 86.871094 95.851562 86.871094 96.328125 86.308594 C 96.507812 86.097656 96.652344 85.511719 96.652344 85.011719 C 96.652344 84.328125 96.476562 84.023438 95.941406 83.78125 C 95.496094 83.582031 89.835938 83.492188 80.695312 83.546875 C 72.703125 83.59375 66.160156 83.5625 66.160156 83.472656 C 66.160156 83.382812 72.972656 75.261719 81.296875 65.421875 C 97.375 46.429688 97.734375 45.9375 97.742188 42.984375 C 97.746094 39.832031 97.734375 39.8125 85.007812 24.703125 C 77.074219 15.285156 72.738281 10.367188 72.015625 9.964844 C 70.679688 9.226562 68.054688 9.171875 66.703125 9.855469 M 35.476562 50.679688 C 27.355469 60.328125 25.871094 62.238281 25.621094 63.339844 C 25.023438 66.015625 25.269531 66.429688 32.757812 75.335938 L 39.601562 83.472656 L 62.21875 83.472656 L 72.554688 71.222656 L 59.082031 55.273438 C 51.667969 46.496094 45.480469 39.320312 45.324219 39.320312 C 45.167969 39.320312 40.738281 44.433594 35.476562 50.679688";
	}
}