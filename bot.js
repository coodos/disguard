import Discord from 'discord.js';
import dotenv from 'dotenv';

import {
  superuser,
  kickUser,
  banUser,
  muteUser,
  unmuteUser,
  exitSuperuser,
} from './controllers/adminControllers.js';

import { help } from './controllers/documentatinControllers.js';

import { poll } from './controllers/funControllers.js';

dotenv.config();

const client = new Discord.Client();

client.on('message', async (msg) => {
  const messageStart = msg.content.split(' ')[0];

  switch (messageStart) {
    case '$su':
      superuser(msg);
      return;
    case '$kick':
      kickUser(msg);
      return;
    case '$ban':
      banUser(msg);
      return;
    case '$mute':
      muteUser(msg);
      return;
    case '$unmute':
      unmuteUser(msg);
      return;
    case '$exit':
      exitSuperuser(msg);
      return;
    case '$help':
      help(msg);
      return;
    case '$poll':
      poll(msg);
      return;
  }
});

client.on('ready', () => {
  client.user.setPresence({
    status: 'online',
    activity: {
      name: '$help',
      type: 'LISTENING',
    },
  });
  console.log(`${client.user.username} is up and running!`);
});

client.login(process.env.BOT_TOKEN);
