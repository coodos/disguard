import { isSudoer } from "../../utils/permissions";
import { Server } from "../../models/Server";
import Discord from "discord.js";
import { sudoersWarningPopup, createEmbed } from "../../utils/embeds";

/**
 * Assign the superuser role to the user :)
 *
 * @param {Discord.Message} - msg
 * @trigger $su
 */

const root = async (msg: Discord.Message) => {
  const canSudo = await isSudoer(msg);
  if (canSudo && msg.member) {
    const server = await Server.findOne({ serverId: msg.member.guild.id });
    if (server) {
      const superuserRole = msg.member.guild.roles.resolveId(
        server.superuserRole
      );
      await msg.member.roles.add(superuserRole);
      createEmbed(
        "(⌐■_■)",
        `${msg.author.username} is now a superuser`,
        msg.channel,
        "success"
      );
    }
  } else {
    sudoersWarningPopup(msg);
  }
};

/**
 * Exit the superuser role
 *
 * @param {Discord.Message} msg
 * @trigger $exit
 */

const exitRoot = async (msg: Discord.Message) => {
  const canSudo = await isSudoer(msg);
  if (canSudo && msg.member) {
    const server = await Server.findOne({ serverId: msg.member.guild.id });
    if (server) {
      const superuserRole = msg.member.guild.roles.resolveId(
        server.superuserRole
      );
      await msg.member.roles.remove(superuserRole);
      createEmbed("(◉ܫ◉)", "All done...", msg.channel, "success");
    }
  } else {
    sudoersWarningPopup(msg);
  }
};

export { root, exitRoot };
