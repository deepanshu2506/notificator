import { ChannelTypes } from "../enums";
import { IEmailTransport } from "./Transport.type";
export declare class TransportStore {
    private transports;
    constructor();
    addTransport(transport: IEmailTransport): void;
    getTransportById(id: string): IEmailTransport | undefined;
    getTransportByChannelType(channelType: ChannelTypes): IEmailTransport[];
    getTransports(): IEmailTransport[];
}
