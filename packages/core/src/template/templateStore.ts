import { IEvent, ITemplate } from "./template.types";

export class TemplateStore {
  private readonly events: Map<String, IEvent>;

  constructor() {
    this.events = new Map();
  }

  addTemplate(template: IEvent): void {
    this.events.set(template.event, template);
  }

  getTemplatesByEventID(eventID: string): Array<ITemplate> {
    const event: IEvent | undefined = this.events.get(eventID);

    if (event) {
      return event.templates;
    } else {
      return [];
    }
  }
}
