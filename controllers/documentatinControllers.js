import { successEmbed, errorEmbed, regularEmbed } from '../functions/embeds.js';

const help = async (msg) => {
  const command = msg.content.split(' ')[1] || null;

  switch (command) {
    case 'kick':
      successEmbed(msg, 'Kick', `syntax : \`$kick @<user> <reason>\``);
      return;
    case 'ban':
      successEmbed(msg, 'Ban', 'syntax : `$ban @<user> <reason>`');
      return;
    case 'mute':
      successEmbed(msg, 'Mute', 'syntax : `$mute @<user>`');
      return;
    case 'unmute':
      successEmbed(msg, 'Unmute', 'syntax : `$unmute @<user>`');
      return;
    case null:
      successEmbed(
        msg,
        'Help is here!',
        `DisGuard is a moderation bot which is a result of my obsession with linux and linux commands.
  
      the idea is that everyone in the server would have an equal role with no difference between mods and regular users visible to a regular user. this would make the users behave as they would in a normal conversation and not how they would thinking someone is constantly moderating them. 
  
      - \`$su\` comand gives the user the role of superuser, hence they are now able to manage the server and members
  
      - \`$kick\` kicks the user pinged 
  
      - \`$ban\` bans the user pinged
  
      - \`$mute\` mutes the pinged user
  
      - \`$unmute\` unmutes the pinged user
    `
      );
      return;
  }
};

export { help };
