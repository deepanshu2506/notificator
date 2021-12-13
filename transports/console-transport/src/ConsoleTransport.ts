import {
  IEmailOptions,
  IEmailTransport,
  ISendMessageResponse,
  ITransportOptions,
  ChannelTypes,
  ResponseStates,
  ISendMessageSuccessResponse,
} from "@notificator/core";

interface IConsoleTransportOptions extends ITransportOptions {}

export class ConsoleTransport implements IEmailTransport {
  constructor(options: IConsoleTransportOptions) {
    this.name = "Console Channel";
    this.id = options.id;
    this.channel = ChannelTypes.EMAIL as ChannelTypes.EMAIL;
  }
  async sendMessage(options: IEmailOptions): Promise<ISendMessageResponse> {
    console.log(options, this);
    const response: ISendMessageSuccessResponse = {
      date: Date.now().toLocaleString(),
      channel: this.channel,
      status: ResponseStates.SUCCESS,
      transportName: this.name,
      transportId: this.id,
    };
    return response;
  }
  name: string;
  id: string;
  channel: ChannelTypes.EMAIL;
}
