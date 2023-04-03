"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHelpMessage = void 0;
const schema_1 = require("@command/schema");
const messages_1 = __importDefault(require("@constant/messages"));
const discord_js_1 = require("discord.js");
const createHelpMessage = () => {
    const embedMessage = new discord_js_1.EmbedBuilder({
        title: messages_1.default.help,
        fields: schema_1.schema.map((item, index) => ({
            name: `${index + 1}. /${item.name}`,
            value: `${item.description}`,
        })),
    });
    return embedMessage;
};
exports.createHelpMessage = createHelpMessage;
