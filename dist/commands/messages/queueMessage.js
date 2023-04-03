"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueueMessages = void 0;
const messages_1 = __importDefault(require("@constant/messages"));
const discord_js_1 = require("discord.js");
const createQueueMessages = (queue) => {
    const embedMessage = new discord_js_1.EmbedBuilder({
        title: messages_1.default.yourQueue,
        fields: queue.map((item, index) => ({
            name: `${index + 1}. ${item.song.title} | ${item.song.author}`,
            value: `${messages_1.default.addedToQueueBy} ${item.requester}`,
        })),
    });
    return [embedMessage];
};
exports.createQueueMessages = createQueueMessages;
