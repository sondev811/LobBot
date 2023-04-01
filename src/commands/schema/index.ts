import { ApplicationCommandData, ApplicationCommandOptionType  } from 'discord.js';

export const schema: ApplicationCommandData[] = [
  {
    name: 'play',
    description: 'Mở một bài hát từ Youtube',
    options: [
      {
        name: 'url_or_keyword',
        type: ApplicationCommandOptionType.String,
        description:
          'Đường dẫn hoặc tên bài hát từ Youtube',
        required: true,
      },
    ],
  },
  {
    name: 'skip',
    description: 'Phát bài hát tiếp theo từ hàng chờ',
  },
  {
    name: 'queue',
    description: 'Xem hàng chờ',
  },
  {
    name: 'pause',
    description: 'Tạm dừng bài hat đang phát',
  },
  {
    name: 'resume',
    description: 'Tiếp tục phát bài hát đang bị tạm dừng',
  },
  {
    name: 'leave',
    description: 'Rời phòng',
  },
  {
    name: 'jump',
    description: 'Phát bài hát từ hàng chờ ở vị trí chỉ định',
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
    name: 'remove',
    description: 'Xóa bài hát trong hàng chờ ở vị trí chỉ định',
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
    description: 'Xem ping tới server',
  },
  {
    name: 'help',
    description: 'Chức năng của bot',
  },
];