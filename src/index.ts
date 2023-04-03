import { bootstrap } from './commands/index';
import { config } from "dotenv";
config();

if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}

import { Client, GatewayIntentBits, IntentsBitField  } from "discord.js";

const client = new Client({
  intents: [
    // IntentsBitField.Flags.Guilds,
    // IntentsBitField.Flags.GuildMessages,
    // IntentsBitField.Flags.GuildVoiceStates,
    // IntentsBitField.Flags.GuildIntegrations,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ],
});

client.on("ready", () => {
  console.log(`> Bot is on ready`);
});

client.login(process.env.TOKEN).then(() => {
  bootstrap(client);
});