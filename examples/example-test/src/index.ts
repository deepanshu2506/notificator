import { ChannelTypes, Notificator } from "@notificator/core";
import { ConsoleTransport } from "@notificator/console-transport";
const notifier = new Notificator();

const consoleTransport = new ConsoleTransport({ id: "abc" });
notifier.registerTransport(consoleTransport);

const template: string = `hello {{person.firstname}} {{person.lastname}}`;
notifier.registerTemplates({
  event: "abc",
  templates: [
    {
      channel: ChannelTypes.EMAIL,
      subject: "hello",
      name: "hello-template",
      template,
    },
    {},
  ],
});

notifier
  .sendNotification("abc", {
    templateVars: { "hello-template": { person: { firstname: "abc" } } },
    email: "vanganideepanshu@gmail.com",
    userID: "abc",
  })
  .then((res) => {
    console.log(res);
  });
