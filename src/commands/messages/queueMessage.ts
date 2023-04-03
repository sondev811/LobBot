import messages from '@constant/messages';
import { QueueItem } from '@model/Server';
import { formatSeconds } from '@util/formatTime';
import { EmbedBuilder } from 'discord.js';

export const createQueueMessages = (queue: QueueItem[]): EmbedBuilder[] => {
  const embedMessage = new EmbedBuilder({
    title: messages.yourQueue,
    fields: queue.map((item, index) => ({
      name: `${index + 1}. ${item.song.title} | ${item.song.author}`,
      value: `${messages.addedToQueueBy} ${item.requester}`,
    })),
  });
  return [embedMessage];
};