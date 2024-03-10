import {WallTool} from "./tools/wallTool";
import {BasicTool} from "./tools/basicTool";
import {SelectTool} from "./tools/selectTool";

export enum Tools {
  Wall,
  Select
}

export namespace Tools {
  export function getTool(tool: Tools) : BasicTool {
    switch (tool) {
      case Tools.Wall:
        return new WallTool;
      case Tools.Select:
        return new SelectTool;
    }
  }
}
