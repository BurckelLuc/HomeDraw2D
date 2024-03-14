import {Component, EventEmitter, HostListener, Output, Type} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolService} from "../services/tool.service";
import {WallTool} from "../../utils/tools/wallTool";
import {BasicTool} from "../../utils/tools/basicTool";
import {Wall} from "../../utils/shapes/wall";
import {SelectTool} from "../../utils/tools/selectTool";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  visible: number = 0;
  selected! : BasicTool;

  @HostListener("document:keydown.t") toggleToolBox() {
    this.visible ^= 1;
  }

  constructor(protected toolService: ToolService) {
    this.toolService.subscribe(x => {
      this.selected = x
    });
  }

  selectTool(tool: Type<BasicTool>) {
    this.toolService.setTool(tool);
  }

  isSelected(selected: BasicTool | undefined, toolType: Type<BasicTool>) {
    return selected instanceof toolType;
  }

  protected readonly WallTool = WallTool;
  protected readonly SelectTool = SelectTool;
}
