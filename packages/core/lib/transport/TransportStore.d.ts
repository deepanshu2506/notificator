import { ChannelTypes } from "../enums";
import { ITransports } from "./Transport.type";
export declare class TransportStore {
    private transports;
    constructor();
    addTransport(transport: ITransports): void;
    getTransportById(id: string): ITransports | undefined;
    getTransportByChannelType(channelType: ChannelTypes): Array<ITransports>;
    getTransports(): Array<ITransports>;
}
