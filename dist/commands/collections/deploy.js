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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = void 0;
const schema_1 = require("@command/schema");
const deploy = (client) => {
    client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        if (!message.guild)
            return;
        if (!((_a = client.application) === null || _a === void 0 ? void 0 : _a.owner))
            yield ((_b = client.application) === null || _b === void 0 ? void 0 : _b.fetch());
        if (message.content.toLowerCase() === '!setup' &&
            message.author.id === ((_d = (_c = client.application) === null || _c === void 0 ? void 0 : _c.owner) === null || _d === void 0 ? void 0 : _d.id)) {
            try {
                yield message.guild.commands.set(schema_1.schema);
                yield message.reply('Cài đặt thành công!');
            }
            catch (e) {
                console.log(e);
                message.reply('Cài đặt không thành công!');
            }
        }
    }));
};
exports.deploy = deploy;
