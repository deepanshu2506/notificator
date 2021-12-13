import { MessageEngine } from "./Engine/MessageEngine";
import { INotificator } from "./index.types";
import { IEvent, ITriggerPayload } from "./template/template.types";
import { TemplateStore } from "./template/templateStore";
import { ITransports, ISendMessageResponse } from "./transport/Transport.type";
import { TransportStore } from "./transport/TransportStore";

export class Notificator implements INotificator {
  private readonly transportStore: TransportStore;
  private readonly templateStore: TemplateStore;
  constructor() {
    this.transportStore = new TransportStore();
    this.templateStore = new TemplateStore();
  }
  async sendNotification(
    eventID: string,
    payload: ITriggerPayload
  ): Promise<Array<ISendMessageResponse>> {
    const messageEngine = this.getMessageEngine();
    const responses: Array<ISendMessageResponse> =
      await messageEngine.sendMessage(eventID, payload);
    return responses;
  }
  registerTransport(transport: ITransports): void {
    this.transportStore.addTransport(transport);
  }
  registerTemplates(event: IEvent): void {
    this.templateStore.addTemplate(event);
  }

  private getMessageEngine() {
    return new MessageEngine({
      transportStore: this.transportStore,
      templateStore: this.templateStore,
    });
  }
}
