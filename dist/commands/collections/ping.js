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
exports.ping = void 0;
const messages_1 = __importDefault(require("@constant/messages"));
exports.ping = {
    name: 'ping',
    execute: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply();
        interaction.followUp(`${messages_1.default.ping} - Độ trễ: ${Math.round(Date.now() - interaction.createdTimestamp)}ms - Độ trễ API: ${Math.round(client.ws.ping)}ms`);
    }),
};
