import { INotificator } from "./index.types";
import { IEmailTransport } from "./transport/Transport.type";
export default class Notificator implements INotificator {
    private readonly transportStore;
    constructor();
    sendNotification(): void;
    registerTransport(transport: IEmailTransport): void;
    registerTemplate(): void;
}
