import { Server } from "../models/Server";
import Discord from "discord.js";

/**
 * checks if the user is a sudoer according to the discord
 * server's config
 *
 * @param {Discord.Message} msg
 * @returns {Prmise<boolean>}
 */

const isSudoer = async (msg: Discord.Message): Promise<boolean> => {
  if (!msg.member) return false;
  const server = await Server.findOne({
    serverId: msg.member.guild.id,
  });
  if (!server) return false;
  const sudoersRoleExists = msg.member.guild.roles.resolveId(
    server.sudoersRole
  );
  if (sudoersRoleExists) {
    return true;
  } else {
    return false;
  }
};

export { isSudoer };
