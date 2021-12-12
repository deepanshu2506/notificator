import { ISendMessageSuccessResponse, ITransports } from "../transport/Transport.type";
import { ChannelTypes } from "../enums";
import { ITriggerPayload } from "../template/template.types";
export interface Handler {
    sendMessage(transport: ITransports, message: IMessage, payload: ITriggerPayload): Promise<ISendMessageSuccessResponse>;
}
export interface IMessage {
    body: string;
    subject: string;
}
export declare class EmailHandler implements Handler {
    constructor();
    sendMessage(transport: ITransports, message: IMessage, payload: ITriggerPayload): Promise<ISendMessageSuccessResponse>;
}
export declare class SMSHandler implements Handler {
    constructor();
    sendMessage(transport: ITransports, message: IMessage, payload: ITriggerPayload): Promise<ISendMessageSuccessResponse>;
}
export declare function HandlerFactory(handlerType: ChannelTypes): Handler;
