export declare class AiService {
    private aiEndpoint;
    constructor();
    sendMessage(message: string, model?: string): Promise<string>;
}
