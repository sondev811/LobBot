import { ApplicationCommandData, ApplicationCommandOptionType  } from 'discord.js';

export const schema: ApplicationCommandData[] = [
  {
    name: 'play',
    description: 'Play a song on Youtube',
    options: [
      {
        name: 'url_or_keyword',
        type: ApplicationCommandOptionType.String,
        description:
          'The url or keyword on Youtube',
        required: true,
      },
    ],
  },
  {
    name: 'skip',
    description: 'Skip to the next song in the queue',
  },
  {
    name: 'queue',
    description: 'See the music queue',
  },
  {
    name: 'pause',
    description: 'Pauses the song that is currently playing',
  },
  {
    name: 'resume',
    description: 'Resume playback of the current song',
  },
  {
    name: 'leave',
    description: 'Leave the voice channel',
  },
  {
    name: 'jump',
    description: 'Jump to song in queue by position',
    options: [
      {
        name: 'position',
        type: ApplicationCommandOptionType.Number,
        description: 'The position of song in queue',
        required: true,
      },
    ],
  },
  {
    name: 'remove',
    description: 'Remove song in queue by position',
    options: [
      {
        name: 'position',
        type: ApplicationCommandOptionType.Number,
        description: 'Vị trí của bài hát trong hàng chờ',
        required: true,
      },
    ],
  },
  {
    name: 'ping',
    description: 'See the ping to server',
  },
  {
    name: 'help',
    description: 'See the help for bot',
  },
];