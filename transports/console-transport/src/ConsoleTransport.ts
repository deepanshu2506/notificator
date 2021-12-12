import {
  IEmailOptions,
  IEmailTransport,
  ISendMessageSuccessResponse,
  ITransportOptions,
  ChannelTypes,
} from "@notificator/core";

interface IConsoleTransportOptions extends ITransportOptions {}

export class ConsoleTransport implements IEmailTransport {
  constructor(options: IConsoleTransportOptions) {
    this.name = "Console Channel";
    this.id = options.id;
    this.channel = ChannelTypes.EMAIL as ChannelTypes.EMAIL;
  }
  async sendMessage(
    options: IEmailOptions
  ): Promise<ISendMessageSuccessResponse> {
    console.log(options, this);
    return {
      transportId: this.id,
      transportName: this.name,
      date: Date.now().toLocaleString(),
      channel: this.channel,
    };
  }
  name: string;
  id: string;
  channel: ChannelTypes.EMAIL;
}
