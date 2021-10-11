import { isSudoer } from "../../utils/permissions";
import { Server } from "../../models/Server";
import Discord from "discord.js";

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
      msg.channel.send(`${msg.author.username} is now a superuser`);
    }
  } else {
    msg.channel.send(
      `${msg.author.username} is not in the sudoers file, this incident will be reported`
    );
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
      msg.channel.send("all done :)");
    }
  } else {
    msg.channel.send(
      `${msg.author.username} is not in the sudoers file, this incident will be reported`
    );
  }
};

export { root, exitRoot };
