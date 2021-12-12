'use strict';

var core = require('@notificator/core');
var consoleTransport$1 = require('@notificator/console-transport');

var notifier = new core.Notificator();
var consoleTransport = new consoleTransport$1.ConsoleTransport({ id: "abc" });
notifier.registerTransport(consoleTransport);
var template = "hello {{person.firstname}} {{person.lastname}}";
notifier.registerTemplates({
    event: "abc",
    templates: [
        {
            channel: core.ChannelTypes.EMAIL,
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
