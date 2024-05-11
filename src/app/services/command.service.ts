import { Injectable } from '@angular/core';
import {ICommand} from "../commands/ICommand";

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private commandHistory: ICommand[] = []
  private undidCommands : ICommand[] = []
  constructor() {
  }

  executeCommand(command: ICommand) {
    this.undidCommands = []
    command.execute();
    let last = this.commandHistory.pop();
    if (last) {
      let commands = command.mergeWithLast(last)
      this.commandHistory = this.commandHistory.concat(commands)
    } else {
      this.commandHistory.push(command)
    }
  }

  undo() {
    let lastCommand = this.commandHistory.pop()
    if (!lastCommand) return;
    lastCommand.undo();
    this.undidCommands.push(lastCommand)
  }

  redo() {
    let toRedo = this.undidCommands.pop();
    if (!toRedo) return;
    toRedo.execute();
    this.commandHistory.push(toRedo);
  }
}
