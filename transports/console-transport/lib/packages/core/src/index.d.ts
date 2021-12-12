export * from "./Notificator";
export * from "./transport/Transport.type";
m "./transport/Transport.type";
export default class Notificator implements INotificator {
    private readonly transportStore;
    constructor();
    sendNotification(): void;
    registerTransport(transport: IEmailTransport): void;
    registerTemplate(): void;
}
