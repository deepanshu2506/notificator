import { ChannelTypes } from "../enums";
export interface ITransport {
    channel: ChannelTypes;
    name: string;
    id: string;
}
export interface IEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
    text?: string;
}
export interface ISmsOptions {
    to: string;
    content: string;
    from?: string;
}
export interface ISendMessageSuccessResponse {
    id?: string;
    date?: string;
}
export interface IEmailTransport extends ITransport {
    channelType: ChannelTypes.EMAIL;
    sendMessage(options: IEmailOptions): Promise<ISendMessageSuccessResponse>;
}
