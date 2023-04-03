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
exports.YoutubeService = void 0;
const regex_1 = require("@constant/regex");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const ytpl_1 = __importDefault(require("ytpl"));
const ytsr_1 = __importDefault(require("ytsr"));
class YoutubeService {
    static getVideoDetails(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedContent = content.match(regex_1.youtubeVideoRegex);
            let id = '';
            if (!parsedContent) {
                const result = yield this.searchVideo(content);
                if (!result)
                    throw new Error();
                id = result;
            }
            else {
                id = parsedContent[1];
            }
            const videoUrl = this.generateVideoUrl(id);
            const result = yield ytdl_core_1.default.getInfo(videoUrl);
            return {
                title: result.videoDetails.title,
                length: parseInt(result.videoDetails.lengthSeconds, 10),
                author: result.videoDetails.author.name,
                thumbnail: result.videoDetails.thumbnails[result.videoDetails.thumbnails.length - 1].url,
                url: videoUrl
            };
        });
    }
    static getPlaylist(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = url.split('?')[1].split('=')[1];
            const playlist = yield (0, ytpl_1.default)(id);
            const songs = [];
            playlist.items.forEach((item) => {
                songs.push({
                    title: item.title,
                    thumbnail: item.bestThumbnail.url || '',
                    author: item.author.name,
                    url: item.shortUrl,
                    length: item.durationSec || 0
                });
            });
            return {
                title: playlist.title,
                thumbnail: playlist.bestThumbnail.url || '',
                author: playlist.author.name,
                songs
            };
        });
    }
    static searchVideo(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, ytsr_1.default)(keyword, { pages: 1 });
            const filteredRes = result.items.filter((item) => item.type === 'video');
            if (filteredRes.length === 0)
                throw new Error();
            const item = filteredRes[0];
            return item.id;
        });
    }
    static isPlaylist(url) {
        const paths = url.match(regex_1.youtubePlaylistRegex);
        if (paths)
            return paths[0];
        return null;
    }
    static generateVideoUrl(id) {
        return `https://www.youtube.com/watch?v=${id}`;
    }
}
exports.YoutubeService = YoutubeService;
