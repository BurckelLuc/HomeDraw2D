import { Component, HostListener, Type } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolService } from "../../services/tool.service";
import { WallTool } from "../../core/tools/wallTool";
import { BasicTool } from "../../core/tools/basicTool";
import { SelectTool } from "../../core/tools/selectTool";
import { DoorTool } from "../../core/tools/doorTool";
import {EraseTool} from "../../core/tools/eraseTool";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.scss",
})
export class ToolbarComponent {
  visible: number = 1;
  selected!: BasicTool;

  protected tools : Type<BasicTool>[] = [
    WallTool,
    SelectTool,
    EraseTool,
    DoorTool
  ]

  @HostListener("document:keydown.t") toggleToolBox() {
    this.visible ^= 1;
  }

  constructor(protected toolService: ToolService) {
    this.toolService.subscribe((x) => {
      this.selected = x;
    });
  }

  selectTool(tool: Type<BasicTool>) {
    this.toolService.setTool(tool);
  }

  isSelected(selected: BasicTool | undefined, toolType: Type<BasicTool>) {
    return selected instanceof toolType;
  }
}
