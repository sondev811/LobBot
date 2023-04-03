"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@command/index");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
if (process.env.NODE_ENV === "production") {
    require("module-alias/register");
}
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({
    intents: [
        // IntentsBitField.Flags.Guilds,
        // IntentsBitField.Flags.GuildMessages,
        // IntentsBitField.Flags.GuildVoiceStates,
        // IntentsBitField.Flags.GuildIntegrations,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildIntegrations,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildVoiceStates
    ],
});
client.on("ready", () => {
    console.log(`> Bot is on ready`);
});
client.login(process.env.TOKEN).then(() => {
    (0, index_1.bootstrap)(client);
});
