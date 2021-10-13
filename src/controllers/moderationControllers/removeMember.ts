import Discord from "discord.js";
import {
  notRootError,
  sudoersWarningPopup,
  createEmbed,
} from "../../utils/embeds";
import { isSudoer, isSuperuser } from "../../utils/permissions";

/**
 * Ban a member that has been pinged and then register
 * the reason for that user
 *
 * @param {Discord.Message} msg
 * @param {Object} args
 */

const banUser = async (msg: Discord.Message, args: Object) => {
  if (await isSudoer(msg)) {
    if (await isSuperuser(msg)) {
      const targetUser = msg.mentions.users.first();
      if (targetUser && msg.guild) {
        interface IBanArgs {
          days?: string;
          reason?: string;
        }
        const { days, reason }: IBanArgs = args;
        const num_days = Number(days);
        await msg.guild.bans.create(targetUser, { reason, days: num_days });
        createEmbed(
          "(^▼ｪ▼ﾒ^)",
          `${targetUser.username} I KEEL YOU!!!!`,
          msg.channel,
          "warn"
        );
      }
    } else {
      notRootError(msg);
    }
  } else {
    sudoersWarningPopup(msg);
  }
};

/**
 * Kick a user mentioned
 *
 * @param {Discord.Message} msg
 * @param {Object} args
 */

const kickUser = async (msg: Discord.Message, args: Object) => {
  if (await isSudoer(msg)) {
    if (await isSuperuser(msg)) {
      const targetUser = msg.mentions.users.first();
      if (targetUser && msg.guild) {
        interface IKickArgs {
          reason?: string;
        }
        const { reason }: IKickArgs = args;
        await msg.guild.members.kick(targetUser, reason);
        createEmbed(
          "(^▼ｪ▼ﾒ^)",
          `${targetUser.username} I KEEL YOU!!!!`,
          msg.channel,
          "warn"
        );
      } else {
        console.log(targetUser, msg.member);
      }
    } else {
      notRootError(msg);
    }
  } else {
    sudoersWarningPopup(msg);
  }
};

export { banUser, kickUser };
