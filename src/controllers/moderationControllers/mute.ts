import Discord from "discord.js";
import { Server } from "../../models/Server";
import { isSudoer, isSuperuser } from "../../utils/permissions";
import {
  createEmbed,
  sudoersWarningPopup,
  notRootError,
} from "../../utils/embeds";

const setBiggerTimeout = async (func: Function, time: number) => {
  let msInHour = 3600 * 1000;
  let timeCount = 0;
  let timer = setInterval(function () {
    timeCount++; // a day has passed

    if (timeCount > time) {
      func();
      clearInterval(timer);
    }
  }, 3600 * 1000);
};

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
    if ((await isSuperuser(msg)) && targetUser) {
      const server = await Server.findOne({ serverId: msg.guild.id });
      if (server) {
        interface IMuteArgs {
          time?: number;
        }
        const { time }: IMuteArgs = args;
        const target = await msg.guild.members.fetch(targetUser.id);
        await target.roles.add(server.mutedRole);
        const timeout = time ? time * 1000 : 3600 * 1000 * 6;
        createEmbed(
          "(^▼ｪ▼ﾒ^)",
          `SILCECE!!! ${targetUser.username} has now been muted`,
          msg.channel,
          "warn"
        );
        setBiggerTimeout(() => {
          target.roles.remove(server.mutedRole);
        }, timeout);
      }
    } else {
      notRootError(msg);
    }
  } else {
    sudoersWarningPopup(msg);
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
    if (await isSuperuser(msg)) {
      if (targetUser) {
        const server = await Server.findOne({ serverId: msg.guild.id });
        if (server) {
          const target = await msg.guild.members.fetch(targetUser.id);
          await target.roles.remove(server.mutedRole);
          createEmbed(
            ":)",
            `You are allowed to speak again ${target.user.username}`,
            msg.channel,
            "success"
          );
        }
      }
    } else {
      notRootError(msg);
    }
  } else {
    sudoersWarningPopup(msg);
  }
};

export { muteUser, unmuteUser };
