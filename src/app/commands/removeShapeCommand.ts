import {ICommand} from "./ICommand";
import {Shape} from "../core/shapes/componentShapes/shape";
import {ShapesService} from "../services/shapes.service";

export class RemoveShapeCommand extends ICommand {
	constructor(
		private shape: Shape,
		shapeService: ShapesService,
	) {
		super(shapeService);
	}
	execute(): void {
		this.shapeService.deleteShape(this.shape.id);
		this.shape.getNodes().forEach((x) => this.shapeService.removeNode(x.id));
	}

	mergeWithLast(previous: ICommand): ICommand[] {
		return [previous, this];
	}

	undo(): void {
		this.shapeService.addShape(this.shape);
		this.shape.getNodes().forEach((x) => this.shapeService.addOrUpdateNode(x));
		this.shapeService.setCurrentShape(this.shape);
	}

}