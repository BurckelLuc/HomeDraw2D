import {LineTool} from "./tools/lineTool";
import {BasicTool} from "./tools/basicTool";
import {CircleTool} from "./tools/circleTool";
import {SquareTool} from "./tools/squareTool";

export enum Tools {
  Line,
  Circle,
  Square
}

export namespace Tools {
  export function getTool(tool: Tools) : BasicTool {
    switch (tool) {
      case Tools.Line:
        return LineTool;
      case Tools.Circle:
        return CircleTool;
      case Tools.Square:
        return SquareTool;
    }
  }
}
