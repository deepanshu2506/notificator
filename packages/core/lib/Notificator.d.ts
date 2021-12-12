import { INotificator } from "./index.types";
import { IEvent, ITriggerPayload } from "./template/template.types";
import { ITransports, ISendMessageSuccessResponse } from "./transport/Transport.type";
export declare class Notificator implements INotificator {
    private readonly transportStore;
    private readonly templateStore;
    constructor();
    sendNotification(eventID: string, payload: ITriggerPayload): Promise<Array<ISendMessageSuccessResponse | any>>;
    registerTransport(transport: ITransports): void;
    registerTemplates(event: IEvent): void;
    private getMessageEngine;
}
