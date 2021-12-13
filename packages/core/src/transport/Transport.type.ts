import { ResponseStates } from "..";
import { ChannelTypes } from "../enums";

export interface ITransport {
  channel: ChannelTypes;
  name: string;
  id: string;
}
export interface ITransportOptions {
  id: string;
}

export interface IEmailOptions {
  to: string;
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

export interface ISendMessageSuccessResponse extends ISendMessageResponse {
  status: ResponseStates.SUCCESS;
  date?: string;
  event?: string;
}

export interface ISendMessageResponse {
  status: ResponseStates;
  channel: ChannelTypes;
  transportName?: string;
  transportId?: string;
}

export interface ISendMessageFailureResponse extends ISendMessageResponse {
  reason: string;
  status: ResponseStates.FAILURE;
}

export type ITransports =
  | IEmailTransport
  | ISMSTransport
  | IPushNotificationTransport;

export interface IEmailTransport extends ITransport {
  channel: ChannelTypes.EMAIL;

  sendMessage(options: IEmailOptions): Promise<ISendMessageResponse>;
}

export interface ISmsOptions {
  to: string;
  content: string;
  from?: string;
}

export interface ISMSTransport extends ITransport {
  sendMessage(options: ISmsOptions): Promise<ISendMessageResponse>;

  channelType: ChannelTypes.SMS;
}

export interface IPushNotificationOptions {
  deviceID: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
}

export interface IPushNotificationTransport {
  sendMessage(options: IPushNotificationOptions): Promise<ISendMessageResponse>;

  channelType: ChannelTypes.SMS;
}
