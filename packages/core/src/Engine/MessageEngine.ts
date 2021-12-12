import {
  ISendMessageSuccessResponse,
  ITransports,
} from "../transport/Transport.type";
import { Handler, HandlerFactory } from "./Handers";
import { ChannelTypes } from "../enums";
import { ITemplate, ITriggerPayload } from "../template/template.types";
import { TemplateStore } from "../template/templateStore";
import { TransportStore } from "../transport/TransportStore";
import { evaluateTemplate } from "../template/TemplateProcessor";
import { get } from "lodash";
interface IMessageEngineOptions {
  templateStore: TemplateStore;
  transportStore: TransportStore;
}
import validator from "validator";
import { IanyProps } from "../index.types";
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
  ): Promise<Array<ISendMessageSuccessResponse | any>> {
    const templates: ITemplate[] =
      this.templateStore.getTemplatesByEventID(eventID);
    let results: Array<ISendMessageSuccessResponse | any> = [];
    for (const template of templates) {
      results = [...results, ...(await this.processMessage(template, payload))];
    }
    return results;
  }

  private async processMessage(
    template: ITemplate,
    payload: ITriggerPayload
  ): Promise<Array<ISendMessageSuccessResponse | any>> {
    this.validatePayload(template, payload);
    const templatePayload: IanyProps = this.getTemplateVarsFromPayload(
      template,
      payload
    );

    const transports: Array<ITransports> =
      this.transportStore.getTransportByChannelType(template.channel);
    const handler: Handler = HandlerFactory(template.channel);
    const results = transports.map(async (transport: ITransports) => {
      const response: ISendMessageSuccessResponse = await handler.sendMessage(
        transport,
        template,
        templatePayload,
        payload
      );
      return response;
    });
    return await Promise.all<ISendMessageSuccessResponse>(results);
  }

  private getTemplateVarsFromPayload(
    template: ITemplate,
    payload: ITriggerPayload
  ): any {
    return get(payload.templateVars, template.name);
  }

  private validatePayload(template: ITemplate, payload: ITriggerPayload) {
    const channel = template.channel;
    switch (channel) {
      case ChannelTypes.EMAIL:
        if (!(payload.email && validator.isEmail(payload.email)))
          throw new Error("valid Email is required in the payload");
      case ChannelTypes.PUSH:
        if (!payload.deviceID) {
          throw new Error("DeviceID is required in the payload");
        }
      case ChannelTypes.SMS:
        if (!payload.phone) {
          throw new Error("phone is required in the payload");
        }
      default:
        return;
    }
  }
}
