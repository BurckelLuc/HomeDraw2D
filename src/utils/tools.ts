import {LineTool} from "./tools/lineTool";
import {BasicTool} from "./tools/basicTool";
import {CircleTool} from "./tools/circleTool";
import {SquareTool} from "./tools/squareTool";
import {SelectTool} from "./tools/selectTool";

export enum Tools {
  Line,
  Circle,
  Square,
  Select
}

export namespace Tools {
  export function getTool(tool: Tools) : BasicTool {
    switch (tool) {
      case Tools.Line:
        return new LineTool;
      case Tools.Circle:
        return new CircleTool;
      case Tools.Square:
        return new SquareTool;
      case Tools.Select:
        return new SelectTool;
    }
  }
}
