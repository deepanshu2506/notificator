import { ChannelTypes } from "..";
export interface ITemplate {
    subject: string;
    channel: ChannelTypes;
    template: string;
    name: string;
}
export interface IEvent {
    event: string;
    templates: Array<ITemplate>;
}
export interface ITriggerPayload {
    email?: string;
    phone?: string;
    userID?: string;
    templateVars: IDictionary<any>;
}
interface IDictionary<TValue> {
    [id: string]: TValue;
}
export {};
