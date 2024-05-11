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

		if (this.currentPoint) {
			if (clickedOnShape.isSome()) {
				return this.onClickOnShape(point, clickedOnShape.unwrap(), shapeService);
			}

			this.currentPoint = this.hoverPoint ?? point;


		}else {
			this.currentPoint = this.hoverPoint ?? point;
			if (clickedOnShape.isSome() && clickedOnShape.unwrap() instanceof Wall) {
				let shape = clickedOnShape.unwrap() as Wall
				clickedOnShape.ifSome((shape) => shapeService.setCurrentShape(shape))

			}
		}


		return Option.None();
	}

	onClickOnShape(
		point: Point,
		shape: Shape,
		shapeService: ShapesService,
	): Option<ICommand> {
		if (!(shape instanceof Wall)) return Option.None();

		let currentShape = shapeService.getCurrentShape();
		if (!currentShape) {
			this.currentPoint = point;

			return Option.Some(
				new RemoveShapeCommand(shape, shapeService),
			);
		}

		// todo : remove shape from extendedShapeCommand
		// todo: delete it

		if (currentShape.id == shape.id) {
			// Clicked on Self
			let commands: ICommand[] = []

			commands.push(new RemoveShapeCommand(shape, shapeService));
			return Option.Some(new CombinedCommand(commands, shapeService));
		}else {
			let commands: ICommand[] = []
			this.currentPoint = point;

			commands.push(new RemoveShapeCommand(shapeService.getShapebyId(currentShape.id), shapeService));
			return Option.Some(new CombinedCommand(commands, shapeService));
		}
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