import Discord from "discord.js";
import { Server } from "../../models/Server";
import { isSudoer } from "../../utils/permissions";

/**
 * Mute the user pinged and then unmute them after while
 *
 * @param {Discord.Message} msg
 * @param {Object} args
 * @trigger $mute
 */

const muteUser = async (msg: Discord.Message, args: Object) => {
  if ((await isSudoer(msg)) && msg.guild) {
    const targetUser = msg.mentions.users.first();
    if (targetUser) {
      const server = await Server.findOne({ serverId: msg.guild.id });
      if (server) {
        interface IMuteArgs {
          time?: number;
        }
        const { time }: IMuteArgs = args;
        const target = await msg.guild.members.fetch(targetUser.id);
        await target.roles.add(server.mutedRole);
        const timeout = time ? time * 1000 : 3600 * 1000 * 6;
        setTimeout(() => {
          target.roles.remove(server.mutedRole);
        }, timeout);
      }
    }
  }
};

/**
 * Unmute the first mention in the message
 *
 * @param {Discord.Message} msg
 */

const unmuteUser = async (msg: Discord.Message) => {
  if ((await isSudoer(msg)) && msg.guild) {
    const targetUser = msg.mentions.users.first();
    if (targetUser) {
      const server = await Server.findOne({ serverId: msg.guild.id });
      if (server) {
        const target = await msg.guild.members.fetch(targetUser.id);
        await target.roles.remove(server.mutedRole);
      }
    }
  }
};

export { muteUser, unmuteUser };
