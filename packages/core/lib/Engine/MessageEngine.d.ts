import { ISendMessageSuccessResponse } from "../transport/Transport.type";
import { ITriggerPayload } from "../template/template.types";
import { TemplateStore } from "../template/templateStore";
import { TransportStore } from "../transport/TransportStore";
interface IMessageEngineOptions {
    templateStore: TemplateStore;
    transportStore: TransportStore;
}
export declare class MessageEngine {
    private readonly templateStore;
    private readonly transportStore;
    constructor(options: IMessageEngineOptions);
    sendMessage(eventID: string, payload: ITriggerPayload): Promise<Array<ISendMessageSuccessResponse | any>>;
    private processMessage;
    private getTemplateVarsFromPayload;
    private validatePayload;
}
export {};
