import {
  IEmailTransport,
  ISendMessageSuccessResponse,
  ITransports,
  ISMSTransport,
  IEmailOptions,
  ISmsOptions,
} from "../transport/Transport.type";
import { ChannelTypes } from "../enums";
import { ITemplate, ITriggerPayload } from "../template/template.types";
import { IanyProps } from "../index.types";
import { evaluateTemplate } from "../template/TemplateProcessor";

export interface Handler {
  sendMessage(
    transport: ITransports,
    template: ITemplate,
    templatePayload: IanyProps,
    payload: ITriggerPayload
  ): Promise<ISendMessageSuccessResponse>;
}

export class EmailHandler implements Handler {
  constructor() {}
  async sendMessage(
    transport: ITransports,
    template: ITemplate,
    templatePayload: IanyProps,
    payload: ITriggerPayload
  ): Promise<ISendMessageSuccessResponse> {
    const messageContent: string = evaluateTemplate(
      template.template,
      templatePayload
    );
    let messageSubject = "";
    if (typeof template.subject === "string") {
      messageSubject = template.subject;
    } else {
      messageSubject = template.subject(payload.subjectVars);
    }
    const emailTransport: IEmailTransport = transport as IEmailTransport;
    const emailOptions: IEmailOptions = {
      html: messageContent,
      subject: messageSubject,
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
    template: ITemplate,
    templatePayload: IanyProps,
    payload: ITriggerPayload
  ): Promise<ISendMessageSuccessResponse> {
    const smsTransport: ISMSTransport = transport as ISMSTransport;
    const messageContent: string = evaluateTemplate(
      template.template,
      templatePayload
    );
    const smsOptions: ISmsOptions = {
      content: messageContent,
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
