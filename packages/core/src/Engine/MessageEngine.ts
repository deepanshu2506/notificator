import {
  ISendMessageResponse,
  ITransports,
  ISendMessageFailureResponse,
} from "../transport/Transport.type";
import { Handler, HandlerFactory } from "./Handers";
import { ChannelTypes } from "../enums";
import { ITemplate, ITriggerPayload } from "../template/template.types";
import { TemplateStore } from "../template/templateStore";
import { TransportStore } from "../transport/TransportStore";
import { get } from "lodash";
interface IMessageEngineOptions {
  templateStore: TemplateStore;
  transportStore: TransportStore;
}
import validator from "validator";
import { IanyProps } from "../index.types";
import { ResponseStates } from "..";
export class MessageEngine {
  private readonly templateStore: TemplateStore;
  private readonly transportStore: TransportStore;
  constructor(options: IMessageEngineOptions) {
    this.templateStore = options.templateStore;
    this.transportStore = options.transportStore;
  }

  async sendMessage(
    eventID: string,
    payload: ITriggerPayload
  ): Promise<Array<ISendMessageResponse>> {
    const templates: ITemplate[] =
      this.templateStore.getTemplatesByEventID(eventID);
    let results: Array<ISendMessageResponse> = [];
    for (const template of templates) {
      results = [...results, ...(await this.processMessage(template, payload))];
    }
    return results;
  }

  private async processMessage(
    template: ITemplate,
    payload: ITriggerPayload
  ): Promise<Array<ISendMessageResponse | any>> {
    const { status, error } = this.validatePayload(template, payload);
    if (!status) {
      const failureResponse: ISendMessageFailureResponse = {
        status: ResponseStates.FAILURE,
        channel: template.channel,
        reason: error,
      };
      return [failureResponse];
    }
    const templatePayload: IanyProps = this.getTemplateVarsFromPayload(
      template,
      payload
    );

    const transports: Array<ITransports> =
      this.transportStore.getTransportByChannelType(template.channel);
    const handler: Handler = HandlerFactory(template.channel);
    const results = transports.map(async (transport: ITransports) => {
      const response: ISendMessageResponse = await handler.sendMessage(
        transport,
        template,
        templatePayload,
        payload
      );
      return response;
    });
    return await Promise.all<ISendMessageResponse>(results);
  }

  private getTemplateVarsFromPayload(
    template: ITemplate,
    payload: ITriggerPayload
  ): any {
    return get(payload.templateVars, template.name);
  }

  private validatePayload(
    template: ITemplate,
    payload: ITriggerPayload
  ): { status: boolean; error: string } {
    const channel = template.channel;
    switch (channel) {
      case ChannelTypes.EMAIL:
        if (!(payload.email && validator.isEmail(payload.email)))
          return {
            status: false,
            error: "valid Email is required in the payload",
          };
        break;
      case ChannelTypes.PUSH:
        if (!payload.deviceID) {
          return {
            status: false,
            error: "DeviceID is required in the payload",
          };
        }
        break;
      case ChannelTypes.SMS:
        if (!payload.phone) {
          return { status: false, error: "phone is required in the payload" };
        }
        break;
    }
    return { status: true, error: "" };
  }
}
