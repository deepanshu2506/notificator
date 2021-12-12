import { IEmailOptions, IEmailTransport, ISendMessageSuccessResponse, ITransportOptions } from "@notificator/core";
import { ChannelTypes } from "@notificator/core/lib/enums";
interface IConsoleTransportOptions extends ITransportOptions {
}
export declare class ConsoleTransport implements IEmailTransport {
    channel: ChannelTypes.EMAIL;
    constructor(options: IConsoleTransportOptions);
    sendMessage(options: IEmailOptions): Promise<ISendMessageSuccessResponse>;
    name: string;
    id: string;
}
export {};
