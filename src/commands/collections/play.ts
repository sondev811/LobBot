import { messages } from '../../constants/messages';
import { QueueItem, Server, servers } from '@/models/Server';
import { YoutubeService } from '@/services/ytb';
import {
  VoiceConnectionStatus,
  entersState,
  joinVoiceChannel,
} from '@discordjs/voice';
import { CommandInteraction, GuildMember } from 'discord.js';
import { createPlayMessage } from '../messages/playMessage';

export const play = {
  name: 'play',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    let server = servers.get(interaction.guildId as string);
    if (!server) {
      if (
        interaction.member instanceof GuildMember &&
        interaction.member.voice.channel
      ) {
        const channel = interaction.member.voice.channel;
        server = new Server(
          joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
          }),
          interaction.guildId as string,
        );
        servers.set(interaction.guildId as string, server);
      }
    }

    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }

    // Make sure the connection is ready before processing the user's request
    try {
      await entersState(
        server.voiceConnection,
        VoiceConnectionStatus.Ready,
        20e3,
      );
    } catch (error) {
      await interaction.followUp(messages.failToJoinVoiceChannel);
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const input = interaction.options.get('url_or_keyword')!.value! as string;
      const song = await YoutubeService.getVideoDetails(input);
      const queueItem: QueueItem = {
        song,
        requester: interaction.member?.user.username as string,
      };
      await server.addSongs([queueItem]);
      interaction.followUp({
        embeds: [
          createPlayMessage({
            title: song.title,
            url: song.url,
            author: song.author,
            thumbnail: song.thumbnail,
            length: song.length,
            requester: interaction.member?.user.username as string,
            queue: server.queue.length
          }),
        ],
      });
    } catch (error) {
      console.log(error);
      await interaction.followUp(messages.failToPlay);
    }
  },
};