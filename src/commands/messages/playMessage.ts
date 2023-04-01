import messages from '@/constants/Messages';
import { formatSeconds } from '@/utils/formatTime';
import { EmbedField, EmbedBuilder } from 'discord.js';

export const createPlayMessage = (payload: {
  title: string;
  url: string;
  author: string;
  thumbnail: string;
  length: number;
  requester: string;
  queue: number;
}): EmbedBuilder => {
  const author: EmbedField = {
    name: messages.author,
    value: payload.author,
    inline: true,
  };
  const length: EmbedField = {
    name: messages.length,
    value: formatSeconds(payload.length),
    inline: true,
  };
  const requester: EmbedField = {
    name: messages.requester,
    value: payload.requester,
    inline: true
  }
  const order: EmbedField = {
    name: 'STT ở hàng chờ',
    value: `${payload.queue + 1}`,
    inline: true
  }
  return new EmbedBuilder()
    .setTitle(payload.title)
    .setURL(payload.url)
    .setAuthor({name: `${messages.addedToQueue}`})
    .setThumbnail(payload.thumbnail)
    .addFields(author, length, requester, order);
};