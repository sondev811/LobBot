import messages from '@/constants/messages';
import { servers } from '@/models/Server';
import { CommandInteraction } from 'discord.js';
import { createQueueMessages } from '../messages/queueMessage';

export const queue = {
  name: 'queue',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.playASongBeforeSeeQueue);
      return;
    }
    if (server.queue.length === 0) {
      await interaction.followUp(messages.nothing);
      return;
    }

    const embedMessages = createQueueMessages(server.queue);
    await interaction.editReply(messages.yourQueue);
    interaction.followUp({
      embeds:
        embedMessages
      ,
    });
  },
};