import {
  IEmailOptions,
  IEmailTransport,
  ISendMessageResponse,
  ITransportOptions,
  ChannelTypes,
  ResponseStates,
  ISendMessageSuccessResponse,
  ISendMessageFailureResponse,
} from "@notificator/core";

import sendgridMail, { ResponseError } from "@sendgrid/mail";
export interface ISendGridTransportOptions extends ITransportOptions {
  apiKey: string;
  from: string;
}

export class SendGridTransport implements IEmailTransport {
  name: string;
  id: string;
  channel: ChannelTypes.EMAIL;
  config: { from: string };

  constructor(options: ISendGridTransportOptions) {
    this.name = "Sendgrid";
    this.id = options.id;
    this.channel = ChannelTypes.EMAIL as ChannelTypes.EMAIL;
    this.config = { from: options.from };
    sendgridMail.setApiKey(options.apiKey);
  }
  async sendMessage(options: IEmailOptions): Promise<ISendMessageResponse> {
    try {
      const response = await sendgridMail.send({
        from: options.from || this.config.from,
        to: options.to,
        html: options.html,
        subject: options.subject,
        substitutions: {},
      });
      const successResponse: ISendMessageSuccessResponse = {
        id: response[0]?.headers["x-message-id"],
        date: response[0]?.headers?.date,
        channel: this.channel,
        status: ResponseStates.SUCCESS,
        transportId: this.id,
        transportName: this.name,
      };
      return successResponse;
    } catch (err) {
      const error: ResponseError = err as ResponseError;
      const errorResponse: ISendMessageFailureResponse = {
        status: ResponseStates.FAILURE,
        reason: error.response ? error.response.body : error.message,
        channel: this.channel,
        transportId: this.id,
        transportName: this.name,
      };
      return errorResponse;
    }
  }
}
