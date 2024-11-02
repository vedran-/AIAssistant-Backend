export declare class CommandsService {
    parseCommand(text: string): Promise<string[]>;
    executeCommand(command: string): Promise<void>;
}
