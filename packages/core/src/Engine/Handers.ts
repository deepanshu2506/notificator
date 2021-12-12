import {
  IEmailTransport,
  ISendMessageSuccessResponse,
  ITransports,
  ISMSTransport,
  IEmailOptions,
  ISmsOptions,
  IPushNotificationTransport,
  IPushNotificationOptions,
} from "../transport/Transport.type";
import { ChannelTypes } from "../enums";
import {
  IEmailTemplate,
  IPushNotification,
  ISMSTemplate,
  ITemplate,
  ITriggerPayload,
} from "../template/template.types";
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
    const emailTemplate: IEmailTemplate = template as IEmailTemplate;
    const messageContent: string = evaluateTemplate(
      template.template,
      templatePayload
    );
    let messageSubject = "";
    if (typeof emailTemplate.subject === "string") {
      messageSubject = emailTemplate.subject;
    } else {
      messageSubject = emailTemplate.subject(payload.subjectVars);
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
    const smsTemplate: ISMSTemplate = template as ISMSTemplate;
    const messageContent: string = evaluateTemplate(
      smsTemplate.template,
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

export class PushNotificationHandler implements Handler {
  async sendMessage(
    transport: ITransports,
    template: ITemplate,
    templatePayload: IanyProps,
    payload: ITriggerPayload
  ): Promise<ISendMessageSuccessResponse> {
    const pushNotificationTemplate: IPushNotification =
      template as IPushNotification;
    const pushNotificationTransport: IPushNotificationTransport =
      transport as IPushNotificationTransport;

    const messageContent: string = evaluateTemplate(
      template.template,
      templatePayload
    );

    const pushNotificationOptions: IPushNotificationOptions = {
      deviceID: payload.deviceID as string,
      content: messageContent,
      image: pushNotificationTemplate.image,
      title:
        typeof pushNotificationTemplate.title === "string"
          ? pushNotificationTemplate.title
          : pushNotificationTemplate.title(payload.subjectVars),
    };

    if (pushNotificationTemplate.subTitle) {
      pushNotificationOptions.subtitle =
        typeof pushNotificationTemplate.title === "string"
          ? pushNotificationTemplate.title
          : pushNotificationTemplate.title(payload.subTitleVars);
    }
    return await pushNotificationTransport.sendMessage(pushNotificationOptions);
  }
}

export function HandlerFactory(handlerType: ChannelTypes): Handler {
  switch (handlerType) {
    case ChannelTypes.EMAIL:
      return new EmailHandler();
    case ChannelTypes.SMS:
      return new SMSHandler();
    case ChannelTypes.PUSH:
      return new PushNotificationHandler();
  }
}
