import { Injectable } from '@nestjs/common';

@Injectable()
export class CommandsService {
  async parseCommand(text: string): Promise<string[]> {
    const commandRegex = /<COMMAND>(.*?)<\/COMMAND>/g;
    const commands: string[] = [];
    let match;

    while ((match = commandRegex.exec(text)) !== null) {
      commands.push(match[1]);
    }

    return commands;
  }

  async executeCommand(command: string): Promise<void> {
    // TODO: Implement command execution logic
    console.log(`Executing command: ${command}`);
  }
}