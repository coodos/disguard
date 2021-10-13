import Discord from "discord.js";
import { Infraction } from "../../models/Infraction";
import { isSudoer, isSuperuser } from "../../utils/permissions";
import {
  sudoersWarningPopup,
  notRootError,
  createEmbed,
} from "../../utils/embeds";

/**
 * Warn a user and register that as an infraction
 * by default the infraction would be marked as just a warn issued by the user
 *
 * @param {Discord.Message} msg
 * @param {Object} args
 */

const warnUser = async (msg: Discord.Message, args: Object) => {
  if ((await isSudoer(msg)) && msg.guild) {
    if (await isSuperuser(msg)) {
      const targetUser = msg.mentions.users.first();
      interface IArgs {
        reason?: string;
      }
      const { reason }: IArgs = args;
      const warnReason = reason
        ? reason
        : `warning issued by ${msg.author.username}`;
      if (targetUser) {
        await Infraction.create({
          server: msg.guild.id,
          user: targetUser.id,
          type: "WARN",
          reason: warnReason,
        });
        createEmbed(
          "(^▼ｪ▼ﾒ^)",
          `${targetUser.username} has been issued a warning with the reason\n${warnReason}`,
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
 * See all the warnings that the user has had in the past
 * thus verifying the track record of this user
 *
 * @param {Discord.Message} msg
 */

const showUserInfo = async (msg: Discord.Message) => {
  if ((await isSudoer(msg)) && msg.guild) {
    if (await isSuperuser(msg)) {
      const targetUser = msg.mentions.users.first();
      if (targetUser) {
        const infractions = await Infraction.find({ user: targetUser.id });
        if (infractions.length > 0) {
          let infractionsData = "";
          for (const [index, infraction] of infractions.entries()) {
            infractionsData =
              infractionsData + `\n${index}. ${infraction.reason}`;
          }
          createEmbed(
            "Warnings",
            `warnings data is here ${infractionsData}`,
            msg.channel,
            "info"
          );
        } else {
          createEmbed(
            ":)",
            "user has a clean track record",
            msg.channel,
            "info"
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

export { warnUser, showUserInfo };
