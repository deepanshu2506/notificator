import { ChannelTypes } from "..";
import { IanyProps } from "../index.types";

export interface ITemplate {
  channel: ChannelTypes;
  template: string;
  name: string;
}

export interface IEmailTemplate extends ITemplate {
  subject: string | ((props?: IanyProps) => string);
  channel: ChannelTypes.EMAIL;
}
export interface ISMSTemplate extends ITemplate {
  channel: ChannelTypes.SMS;
}

export interface IPushNotification extends ITemplate {
  title: string | ((props?: IanyProps) => string);
  subTitle: string | ((props?: IanyProps) => string);
  image: string;
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
