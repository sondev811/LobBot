"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayMessage = void 0;
const messages_1 = __importDefault(require("@constant/messages"));
const formatTime_1 = require("@util/formatTime");
const discord_js_1 = require("discord.js");
const createPlayMessage = (payload) => {
    const author = {
        name: messages_1.default.author,
        value: payload.author,
        inline: true,
    };
    const length = {
        name: messages_1.default.length,
        value: (0, formatTime_1.formatSeconds)(payload.length),
        inline: true,
    };
    const requester = {
        name: messages_1.default.requester,
        value: payload.requester,
        inline: true
    };
    const order = {
        name: 'STT ở hàng chờ',
        value: `${payload.queue + 1}`,
        inline: true
    };
    return new discord_js_1.EmbedBuilder()
        .setTitle(payload.title)
        .setURL(payload.url)
        .setAuthor({ name: `${messages_1.default.addedToQueue}` })
        .setThumbnail(payload.thumbnail)
        .addFields(author, length, requester, order);
};
exports.createPlayMessage = createPlayMessage;
