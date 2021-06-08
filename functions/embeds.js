import { MessageEmbed } from 'discord.js';

const errorEmbed = (msg, emoticon, message) => {
  const embed = new MessageEmbed()
    .setTitle(emoticon)
    .setColor(0xff0000)
    .setDescription(message);
  msg.channel.send(embed);
};

const successEmbed = (msg, emoticon, message) => {
  const embed = new MessageEmbed()
    .setTitle(emoticon)
    .setColor(0x00ff00)
    .setDescription(message);
  msg.channel.send(embed);
};

const regularEmbed = (msg, emoticon, message) => {
  const embed = new MessageEmbed()
    .setTitle(emoticon)
    .setColor(0xf5f5f5)
    .setDescription(message);
  msg.channel.send(embed);
};

export { errorEmbed, successEmbed, regularEmbed };
