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
  const sudoersRoleExists = msg.member.roles.cache.find(
    (role) => role.id === server.sudoersRole
  );
  if (sudoersRoleExists) {
    return true;
  } else {
    return false;
  }
};

/**
 * check if the user is in sudo
 *
 * @param {Discord.Message} msg
 */

const isSuperuser = async (msg: Discord.Message) => {
  if (!msg.member) return false;
  const server = await Server.findOne({
    serverId: msg.member.guild.id,
  });
  if (!server) return false;
  const superuserRole = msg.member.roles.cache.find(
    (role) => role.id === server.superuserRole
  );
  if (superuserRole) {
    return true;
  } else {
    return false;
  }
};

export { isSudoer, isSuperuser };
