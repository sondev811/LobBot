import { Client } from 'discord.js';
import { schema } from '../schema';

export const deploy = (client: Client): void => {
  client.on('messageCreate', async (message) => {
    if (!message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();
    if (
      message.content.toLowerCase() === '!setup' &&
      message.author.id === client.application?.owner?.id
    ) {
      try {
        await message.guild.commands.set(schema);
        await message.reply('Cài đặt thành công!');
      } catch (e) {
        console.log(e);
        message.reply('Cài đặt không thành công!');
      }
    }
  });
};