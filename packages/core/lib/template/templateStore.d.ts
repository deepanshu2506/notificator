import { IEvent, ITemplate } from "./template.types";
export declare class TemplateStore {
    private readonly events;
    constructor();
    addTemplate(template: IEvent): void;
    getTemplatesByEventID(eventID: string): Array<ITemplate>;
}
