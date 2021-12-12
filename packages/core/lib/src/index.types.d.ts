import { IEmailTransport } from "./transport/Transport.type";
export interface INotificator {
    registerTransport(transport: IEmailTransport): void;
    registerTemplate(): void;
    sendNotification(): void;
}
