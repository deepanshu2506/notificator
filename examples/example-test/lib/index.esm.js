import { Notificator, ChannelTypes } from '@notificator/core';
import { ConsoleTransport } from '@notificator/console-transport';

var notifier = new Notificator();
var consoleTransport = new ConsoleTransport({ id: "abc" });
notifier.registerTransport(consoleTransport);
var template = "hello {{person.firstname}} {{person.lastname}}";
notifier.registerTemplates({
    event: "abc",
    templates: [
        {
            channel: ChannelTypes.EMAIL,
            subject: "hello",
            name: "hello-template",
            template: template,
        },
    ],
});
notifier
    .sendNotification("abc", {
    templateVars: { "hello-template": { person: { firstname: "abc" } } },
    email: "vanganideepanshu@gmail.com",
    userID: "abc",
})
    .then(function (res) {
    console.log(res);
});
