import {
  IEmailTransport,
  ISendMessageResponse,
  ISendMessageFailureResponse,
  ITransports,
  ISMSTransport,
  IEmailOptions,
  ISmsOptions,
  IPushNotificationTransport,
  IPushNotificationOptions,
} from "../transport/Transport.type";
import { ChannelTypes, ResponseStates } from "../enums";
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
  ): Promise<ISendMessageResponse>;
}

export class EmailHandler implements Handler {
  constructor() {}
  async sendMessage(
    transport: ITransports,
    template: ITemplate,
    templatePayload: IanyProps,
    payload: ITriggerPayload
  ): Promise<ISendMessageResponse> {
    const emailTemplate: IEmailTemplate = template as IEmailTemplate;
    let messageContent = "";
    try {
      messageContent = evaluateTemplate(
        emailTemplate.template,
        templatePayload
      );
    } catch (err) {
      const error = err as Error;
      const response: ISendMessageFailureResponse = {
        status: ResponseStates.FAILURE,
        reason: error.message,
        channel: emailTemplate.channel,
      };
      return response;
    }
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
  ): Promise<ISendMessageResponse> {
    const smsTransport: ISMSTransport = transport as ISMSTransport;
    const smsTemplate: ISMSTemplate = template as ISMSTemplate;
    let messageContent = "";
    try {
      messageContent = evaluateTemplate(smsTemplate.template, templatePayload);
    } catch (err) {
      const error = err as Error;
      const response: ISendMessageFailureResponse = {
        status: ResponseStates.FAILURE,
        reason: error.message,
        channel: smsTemplate.channel,
      };
      return response;
    }
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
  ): Promise<ISendMessageResponse> {
    const pushNotificationTemplate: IPushNotification =
      template as IPushNotification;
    const pushNotificationTransport: IPushNotificationTransport =
      transport as IPushNotificationTransport;

    let messageContent = "";
    try {
      messageContent = evaluateTemplate(
        pushNotificationTemplate.template,
        templatePayload
      );
    } catch (err) {
      const error = err as Error;
      const response: ISendMessageFailureResponse = {
        status: ResponseStates.FAILURE,
        reason: error.message,
        channel: pushNotificationTemplate.channel,
      };
      return response;
    }
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
