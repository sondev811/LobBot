"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const messages_1 = __importDefault(require("@constant/messages"));
const deploy_1 = require("./collections/deploy");
const help_1 = require("./collections/help");
const jump_1 = require("./collections/jump");
const leave_1 = require("./collections/leave");
const pause_1 = require("./collections/pause");
const ping_1 = require("./collections/ping");
const play_1 = require("./collections/play");
const queue_1 = require("./collections/queue");
const remove_1 = require("./collections/remove");
const resume_1 = require("./collections/resume");
const skip_1 = require("./collections/skip");
const bootstrap = (client) => {
    (0, deploy_1.deploy)(client);
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.isCommand() || !interaction.guildId)
            return;
        try {
            switch (interaction.commandName) {
                case play_1.play.name:
                    play_1.play.execute(interaction);
                    break;
                case skip_1.skip.name:
                    skip_1.skip.execute(interaction);
                    break;
                case pause_1.pause.name:
                    pause_1.pause.execute(interaction);
                    break;
                case resume_1.resume.name:
                    resume_1.resume.execute(interaction);
                    break;
                case leave_1.leave.name:
                    leave_1.leave.execute(interaction);
                    break;
                case queue_1.queue.name:
                    queue_1.queue.execute(interaction);
                    break;
                case jump_1.jump.name:
                    jump_1.jump.execute(interaction);
                    break;
                case ping_1.ping.name:
                    ping_1.ping.execute(client, interaction);
                    break;
                case remove_1.remove.name:
                    remove_1.remove.execute(interaction);
                    break;
                case help_1.help.name:
                    help_1.help.execute(interaction);
                    break;
            }
        }
        catch (e) {
            interaction.reply(messages_1.default.error);
        }
    }));
};
exports.bootstrap = bootstrap;
