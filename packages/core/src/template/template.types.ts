import { ChannelTypes } from "..";
import { IanyProps } from "../index.types";

export interface ITemplate {
  subject: string | ((props?: IanyProps) => string);
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
  templateVars?: IDictionary<any>;
  subjectVars?: IanyProps;
}

interface IDictionary<TValue> {
  [id: string]: TValue;
}
