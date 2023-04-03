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
exports.resume = void 0;
const messages_1 = __importDefault(require("@constant/messages"));
const Server_1 = require("@model/Server");
const voice_1 = require("@discordjs/voice");
exports.resume = {
    name: 'resume',
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply();
        const server = Server_1.servers.get(interaction.guildId);
        if (!server) {
            yield interaction.followUp(messages_1.default.joinVoiceChannel);
            return;
        }
        if (server.audioPlayer.state.status === voice_1.AudioPlayerStatus.Paused) {
            server.audioPlayer.unpause();
            yield interaction.followUp(messages_1.default.resumed);
            return;
        }
        yield interaction.followUp(messages_1.default.notPlaying);
    }),
};
