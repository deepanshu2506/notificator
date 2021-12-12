import {
  IEmailTransport,
  ISendMessageSuccessResponse,
  ITransports,
  ISMSTransport,
  IEmailOptions,
  ISmsOptions,
} from "../transport/Transport.type";
import { ChannelTypes } from "../enums";
import { ITriggerPayload } from "../template/template.types";

export interface Handler {
  sendMessage(
    transport: ITransports,
    message: IMessage,
    payload: ITriggerPayload
  ): Promise<ISendMessageSuccessResponse>;
}
export interface IMessage {
  body: string;
  subject: string;
}
export class EmailHandler implements Handler {
  constructor() {}
  async sendMessage(
    transport: ITransports,
    message: IMessage,
    payload: ITriggerPayload
  ): Promise<ISendMessageSuccessResponse> {
    const emailTransport: IEmailTransport = transport as IEmailTransport;
    const emailOptions: IEmailOptions = {
      html: message.body,
      subject: message.subject,
      to: payload.email as string,
    };
    const response = await emailTransport.sendMessage(emailOptions);
    return response;
  }
}

export class SMSHandler implements Handler {
  constructor() {}
  async sendMessage(
    transport: ITransports,
    message: IMessage,
    payload: ITriggerPayload
  ): Promise<ISendMessageSuccessResponse> {
    const smsTransport: ISMSTransport = transport as ISMSTransport;
    const smsOptions: ISmsOptions = {
      content: message.body,
      to: payload.phone as string,
    };
    const response = await smsTransport.sendMessage(smsOptions);
    return response;
  }
}

export function HandlerFactory(handlerType: ChannelTypes): Handler {
  switch (handlerType) {
    case ChannelTypes.EMAIL:
      return new EmailHandler();
    case ChannelTypes.SMS:
      return new SMSHandler();
  }
}
