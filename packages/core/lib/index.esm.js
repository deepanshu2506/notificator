import * as handlebars from 'handlebars';
import { get } from 'lodash';
import validator from 'validator';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes["EMAIL"] = "EMAIL";
    ChannelTypes["SMS"] = "SMS";
})(ChannelTypes || (ChannelTypes = {}));

var EmailHandler = /** @class */ (function () {
    function EmailHandler() {
    }
    EmailHandler.prototype.sendMessage = function (transport, message, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var emailTransport, emailOptions, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emailTransport = transport;
                        emailOptions = {
                            html: message.body,
                            subject: message.subject,
                            to: payload.email,
                        };
                        return [4 /*yield*/, emailTransport.sendMessage(emailOptions)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return EmailHandler;
}());
var SMSHandler = /** @class */ (function () {
    function SMSHandler() {
    }
    SMSHandler.prototype.sendMessage = function (transport, message, payload) {
        console.log(transport, message, payload);
        throw new Error("Method not implemented.");
    };
    return SMSHandler;
}());
function HandlerFactory(handlerType) {
    switch (handlerType) {
        case ChannelTypes.EMAIL:
            return new EmailHandler();
        case ChannelTypes.SMS:
            return new SMSHandler();
    }
}

var HandleBarsPropertiesError = /** @class */ (function (_super) {
    __extends(HandleBarsPropertiesError, _super);
    function HandleBarsPropertiesError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "HandleBarsPropertiesError";
        return _this;
    }
    return HandleBarsPropertiesError;
}(Error));

function evaluateTemplate(template, context, options) {
    if (options === void 0) { options = { strictParams: false }; }
    var hbsTemplate = handlebars.compile(template, {
        strict: options.strictParams,
    });
    try {
        var output = hbsTemplate(context);
        return output;
    }
    catch (err) {
        var error = err;
        if (error.name === "Error") {
            throw new HandleBarsPropertiesError(err.message);
        }
        else {
            throw err;
        }
    }
}

var MessageEngine = /** @class */ (function () {
    function MessageEngine(options) {
        this.templateStore = options.templateStore;
        this.transportStore = options.transportStore;
    }
    MessageEngine.prototype.sendMessage = function (eventID, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var templates, results, _i, templates_1, template, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        templates = this.templateStore.getTemplatesByEventID(eventID);
                        results = [];
                        _i = 0, templates_1 = templates;
                        _b.label = 1;
                    case 1:
                        if (!(_i < templates_1.length)) return [3 /*break*/, 4];
                        template = templates_1[_i];
                        _a = [__spreadArray([], results, true)];
                        return [4 /*yield*/, this.processMessage(template, payload)];
                    case 2:
                        results = __spreadArray.apply(void 0, _a.concat([(_b.sent()), true]));
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, results];
                }
            });
        });
    };
    MessageEngine.prototype.processMessage = function (template, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var templatePayload, messageContent, transports, handler, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validatePayload(template, payload);
                        templatePayload = this.getTemplateVarsFromPayload(template, payload);
                        messageContent = evaluateTemplate(template.template, templatePayload);
                        transports = this.transportStore.getTransportByChannelType(template.channel);
                        handler = HandlerFactory(template.channel);
                        results = transports.map(function (transport) { return __awaiter(_this, void 0, void 0, function () {
                            var response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, handler.sendMessage(transport, { body: messageContent, subject: template.subject }, payload)];
                                    case 1:
                                        response = _a.sent();
                                        return [2 /*return*/, response];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(results)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MessageEngine.prototype.getTemplateVarsFromPayload = function (template, payload) {
        return get(payload.templateVars, template.name);
    };
    MessageEngine.prototype.validatePayload = function (template, payload) {
        var channel = template.channel;
        switch (channel) {
            case ChannelTypes.EMAIL:
                if (!(payload.email && validator.isEmail(payload.email)))
                    throw new Error("valid Email is required in the payload");
            default:
                return;
        }
    };
    return MessageEngine;
}());

var TemplateStore = /** @class */ (function () {
    function TemplateStore() {
        this.events = new Map();
    }
    TemplateStore.prototype.addTemplate = function (template) {
        this.events.set(template.event, template);
    };
    TemplateStore.prototype.getTemplatesByEventID = function (eventID) {
        var event = this.events.get(eventID);
        if (event) {
            return event.templates;
        }
        else {
            return [];
        }
    };
    return TemplateStore;
}());

var TransportStore = /** @class */ (function () {
    function TransportStore() {
        this.transports = [];
    }
    TransportStore.prototype.addTransport = function (transport) {
        this.transports.push(transport);
    };
    TransportStore.prototype.getTransportById = function (id) {
        return this.transports.find(function (transport) { return transport.id === id; });
    };
    TransportStore.prototype.getTransportByChannelType = function (channelType) {
        return this.transports.filter(function (transport) { return transport.channel === channelType; });
    };
    TransportStore.prototype.getTransports = function () {
        return this.transports;
    };
    return TransportStore;
}());

var Notificator = /** @class */ (function () {
    function Notificator() {
        this.transportStore = new TransportStore();
        this.templateStore = new TemplateStore();
    }
    Notificator.prototype.sendNotification = function (eventID, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var messageEngine, responses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageEngine = this.getMessageEngine();
                        return [4 /*yield*/, messageEngine.sendMessage(eventID, payload)];
                    case 1:
                        responses = _a.sent();
                        return [2 /*return*/, responses];
                }
            });
        });
    };
    Notificator.prototype.registerTransport = function (transport) {
        this.transportStore.addTransport(transport);
    };
    Notificator.prototype.registerTemplates = function (event) {
        this.templateStore.addTemplate(event);
    };
    Notificator.prototype.getMessageEngine = function () {
        return new MessageEngine({
            transportStore: this.transportStore,
            templateStore: this.templateStore,
        });
    };
    return Notificator;
}());

export { ChannelTypes, Notificator, evaluateTemplate };
