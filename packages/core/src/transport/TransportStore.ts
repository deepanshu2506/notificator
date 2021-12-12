import { ChannelTypes } from "../enums";
import { ITransports } from "./Transport.type";

export class TransportStore {
  private transports: Array<ITransports>;
  constructor() {
    this.transports = [];
  }

  addTransport(transport: ITransports): void {
    this.transports.push(transport);
  }

  getTransportById(id: string): ITransports | undefined {
    return this.transports.find((transport) => transport.id === id);
  }

  getTransportByChannelType(channelType: ChannelTypes): Array<ITransports> {
    return this.transports.filter(
      (transport) => transport.channel === channelType
    );
  }

  getTransports(): Array<ITransports> {
    return this.transports;
  }
}
