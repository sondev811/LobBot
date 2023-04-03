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
exports.servers = exports.Server = void 0;
const voice_1 = require("@discordjs/voice");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
class Server {
    constructor(voiceConnection, guildId) {
        this.isReady = false;
        this.voiceConnection = voiceConnection;
        this.audioPlayer = (0, voice_1.createAudioPlayer)();
        this.queue = [];
        this.playing = undefined;
        this.guildId = guildId;
        this.voiceConnection.on('stateChange', (_, newState) => __awaiter(this, void 0, void 0, function* () {
            if (newState.status === voice_1.VoiceConnectionStatus.Disconnected) {
                /*
                  Nếu websocket đã bị đóng với mã 4014 có 2 khả năng:
                  - Nếu nó có khả năng tự kết nối lại (có khả năng do chuyển kênh thoại), ta cho dảnh ra 5s để tìm hiểu và cho kết nối lại.
                  - Nếu bot bị kick khỏi kênh thoại, ta sẽ phá huỷ kết nối.
                        */
                if (newState.reason === voice_1.VoiceConnectionDisconnectReason.WebSocketClose &&
                    newState.closeCode === 4014) {
                    try {
                        yield (0, voice_1.entersState)(this.voiceConnection, voice_1.VoiceConnectionStatus.Connecting, 5000);
                    }
                    catch (e) {
                        this.leave();
                    }
                }
                else if (this.voiceConnection.rejoinAttempts < 5) {
                    this.voiceConnection.rejoin();
                }
                else {
                    this.leave();
                }
            }
            else if (newState.status === voice_1.VoiceConnectionStatus.Destroyed) {
                this.leave();
            }
            else if (!this.isReady &&
                (newState.status === voice_1.VoiceConnectionStatus.Connecting ||
                    newState.status === voice_1.VoiceConnectionStatus.Signalling)) {
                /*
                            Nếu tín hiệu kết nối ở trạng thái "Connecting" hoặc "Signalling", ta sẽ đợi 20s để kết nối sẵn sàng.
                  Sau 20s nếu kết nối không thành công, ta sẽ phá huỷ kết nối.
                        */
                this.isReady = true;
                try {
                    yield (0, voice_1.entersState)(this.voiceConnection, voice_1.VoiceConnectionStatus.Ready, 20000);
                }
                catch (_a) {
                    if (this.voiceConnection.state.status !==
                        voice_1.VoiceConnectionStatus.Destroyed)
                        this.voiceConnection.destroy();
                }
                finally {
                    this.isReady = false;
                }
            }
        }));
        // Đây là sự kiện khi một bài hát kết thúc và ta chuyển sang bài mới.
        this.audioPlayer.on('stateChange', (oldState, newState) => __awaiter(this, void 0, void 0, function* () {
            if (newState.status === voice_1.AudioPlayerStatus.Idle &&
                oldState.status !== voice_1.AudioPlayerStatus.Idle) {
                yield this.play();
            }
        }));
        voiceConnection.subscribe(this.audioPlayer);
    }
    addSongs(queueItems) {
        return __awaiter(this, void 0, void 0, function* () {
            this.queue = this.queue.concat(queueItems);
            if (!this.playing) {
                yield this.play();
            }
        });
    }
    stop() {
        this.playing = undefined;
        this.queue = [];
        this.audioPlayer.stop();
    }
    // Bot rời khỏi kênh thoại và xoá server hiện tại khỏi map.
    leave() {
        if (this.voiceConnection.state.status !== voice_1.VoiceConnectionStatus.Destroyed) {
            this.voiceConnection.destroy();
        }
        this.stop();
        exports.servers.delete(this.guildId);
    }
    // Dừng bài hát đang phát
    pause() {
        this.audioPlayer.pause();
    }
    // Tiếp tục bài hát bị dừng
    resume() {
        this.audioPlayer.unpause();
    }
    // Chuyển tới bài hát trong queue
    jump(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = this.queue[position - 1];
            this.queue = this.queue
                .splice(0, position - 1)
                .concat(this.queue.splice(position, this.queue.length - 1));
            this.queue.unshift(target);
            yield this.play();
            return target;
        });
    }
    // Xoá bài hát trong queue
    remove(position) {
        return this.queue.splice(position - 1, 1)[0];
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Phát bài hát đầu tiên trong queue nếu queue không rỗng
                if (this.queue.length > 0) {
                    this.playing = this.queue.shift();
                    let stream;
                    const highWaterMark = 1024 * 1024 * 10;
                    stream = (0, ytdl_core_1.default)(this.playing.song.url, {
                        highWaterMark,
                        filter: 'audioonly',
                        quality: 'highestaudio',
                    });
                    const audioResource = (0, voice_1.createAudioResource)(stream);
                    this.audioPlayer.play(audioResource);
                }
                else {
                    // Dừng việc phát nhạc, gán thuộc tính playing = undefined
                    this.playing = undefined;
                    this.audioPlayer.stop();
                }
            }
            catch (e) {
                // Nếu việc stream 1 bài hát có trục trặc gì, thì ta sẽ phát tiếp tục bài hát tiếp theo
                this.play();
            }
        });
    }
}
exports.Server = Server;
// Map các server mà bot đang trong kênh thoại
exports.servers = new Map();
