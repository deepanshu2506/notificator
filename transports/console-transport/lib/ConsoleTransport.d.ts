import { IEmailOptions, IEmailTransport, ISendMessageSuccessResponse, ITransportOptions, ChannelTypes } from "@notificator/core";
interface IConsoleTransportOptions extends ITransportOptions {
}
export declare class ConsoleTransport implements IEmailTransport {
    constructor(options: IConsoleTransportOptions);
    sendMessage(options: IEmailOptions): Promise<ISendMessageSuccessResponse>;
    name: string;
    id: string;
    channel: ChannelTypes.EMAIL;
}
export {};
