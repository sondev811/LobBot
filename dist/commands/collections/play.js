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
exports.play = void 0;
const messages_1 = __importDefault(require("@constant/messages"));
const Server_1 = require("@model/Server");
const ytb_1 = require("@service/ytb");
const voice_1 = require("@discordjs/voice");
const discord_js_1 = require("discord.js");
const playMessage_1 = require("../messages/playMessage");
exports.play = {
    name: 'play',
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        yield interaction.deferReply();
        let server = Server_1.servers.get(interaction.guildId);
        if (!server) {
            if (interaction.member instanceof discord_js_1.GuildMember &&
                interaction.member.voice.channel) {
                const channel = interaction.member.voice.channel;
                server = new Server_1.Server((0, voice_1.joinVoiceChannel)({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                }), interaction.guildId);
                Server_1.servers.set(interaction.guildId, server);
            }
        }
        if (!server) {
            yield interaction.followUp(messages_1.default.joinVoiceChannel);
            return;
        }
        // Make sure the connection is ready before processing the user's request
        try {
            yield (0, voice_1.entersState)(server.voiceConnection, voice_1.VoiceConnectionStatus.Ready, 20e3);
        }
        catch (error) {
            yield interaction.followUp(messages_1.default.failToJoinVoiceChannel);
            return;
        }
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const input = interaction.options.get('url_or_keyword').value;
            const song = yield ytb_1.YoutubeService.getVideoDetails(input);
            const queueItem = {
                song,
                requester: (_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user.username,
            };
            yield server.addSongs([queueItem]);
            interaction.followUp({
                embeds: [
                    (0, playMessage_1.createPlayMessage)({
                        title: song.title,
                        url: song.url,
                        author: song.author,
                        thumbnail: song.thumbnail,
                        length: song.length,
                        requester: (_b = interaction.member) === null || _b === void 0 ? void 0 : _b.user.username,
                        queue: server.queue.length
                    }),
                ],
            });
        }
        catch (error) {
            console.log(error);
            yield interaction.followUp(messages_1.default.failToPlay);
        }
    }),
};
