import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Tools} from "../../utils/tools";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  visible: number = 0;
  @Output()
  selectedTool : EventEmitter<Tools> = new EventEmitter()
  selectedToolIndex = 0;

  @HostListener("document:keydown.t") toggleToolBox() {
    this.visible ^= 1;
  }



  selectTool(tool: Tools) {
    this.selectedTool.emit(tool);
    this.selectedToolIndex = tool;
  }

  protected readonly Tools = Tools;
}
