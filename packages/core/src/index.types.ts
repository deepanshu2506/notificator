import { IEvent, ITriggerPayload } from "./template/template.types";
import { IEmailTransport } from "./transport/Transport.type";

export interface INotificator {
  registerTransport(transport: IEmailTransport): void;

  registerTemplates(event: IEvent): void;

  sendNotification(eventID: string, payload: ITriggerPayload): void;
}
