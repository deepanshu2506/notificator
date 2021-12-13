import {
  ChannelTypes,
  ISendMessageFailureResponse,
  Notificator,
  ResponseStates,
} from "@notificator/core";
import { ConsoleTransport } from "@notificator/console-transport";
import { SendGridTransport } from "@notificator/sendgrid";
import { IEmailTemplate } from "packages/core/lib/template/template.types";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env);

const notifier = new Notificator();

const consoleTransport = new ConsoleTransport({ id: "abc" });
const sendgridTransport = new SendGridTransport({
  apiKey: process.env.SENDGRID_API_KEY || "",
  from: "deepanshu.v@somaiya.edu",
  id: "sendgrid-test",
});
notifier.registerTransport(consoleTransport);
notifier.registerTransport(sendgridTransport);

const template: string = `hello {{person.firstname}} {{person.lastname}}`;
const consoleTemplate: IEmailTemplate = {
  channel: ChannelTypes.EMAIL,
  subject: "hello",
  name: "hello-template",
  template,
};
notifier.registerTemplates({
  event: "abc",
  templates: [consoleTemplate],
});

notifier
  .sendNotification("abc", {
    templateVars: { "hello-template": { person: { firstname: "abc" } } },
    email: "vanganideepanshu@gmail.com",
    userID: "abc",
  })
  .then((res) => {
    console.log(res);
    res.map((item) => {
      if (item.status === ResponseStates.FAILURE) {
        console.log((item as ISendMessageFailureResponse).reason);
      }
    });
  });
