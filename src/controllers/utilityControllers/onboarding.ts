import Discord from "discord.js";
import { Server } from "../../models/Server";
import { misusedCommand } from "../../utils/embeds";

/**
 * Handle the onboarding where the users chooses what to call
 * their superuser, sudoers and muted roles
 *
 * @trigger .config
 */

const handleOnboarding = async (msg: Discord.Message, args: Object) => {
  interface IArgs {
    superuser?: string;
    muted?: string;
    sudoers?: string;
  }
  const isAdmin = msg.member && msg.member.permissions.has("ADMINISTRATOR");
  const { superuser, muted, sudoers }: IArgs = args;
  if (isAdmin && sudoers && superuser && muted && msg.guild) {
    const rolesCount = msg.member.guild.roles.cache.size;
    const sudoersRole = await msg.member.guild.roles.create({
      name: sudoers,
      position: rolesCount - 1,
    });
    const superuserRole = await msg.member.guild.roles.create({
      name: superuser,
      position: rolesCount - 2,
      permissions: [
        "BAN_MEMBERS",
        "KICK_MEMBERS",
        "MANAGE_CHANNELS",
        "MANAGE_THREADS",
        "MUTE_MEMBERS",
        "MOVE_MEMBERS",
      ],
      color: "RED",
    });
    await superuserRole.setHoist(true);
    const mutedRole = await msg.member.guild.roles.create({
      name: muted,
      position: rolesCount - 3,
    });
    const serverExists = await Server.findOne({
      serverId: msg.member.guild.id,
    });
    if (serverExists) {
      serverExists.sudoersRole = sudoersRole.id ?? serverExists.sudoersRole;
      serverExists.superuserRole =
        superuserRole.id ?? serverExists.superuserRole;
      serverExists.mutedRole = mutedRole.id ?? serverExists.mutedRole;
      await serverExists.save();
    } else {
      await Server.create({
        serverId: msg.member.guild.id,
        superuserRole: superuserRole.id,
        sudoersRole: sudoersRole.id,
        mutedRole: mutedRole.id,
      });
    }

    msg.guild.channels.cache.forEach(async (channel: any) => {
      try {
        await channel.permissionOverwrites.edit(mutedRole, {
          MANAGE_THREADS: false,
          SEND_MESSAGES: false,
          SPEAK: false,
          ADD_REACTIONS: false,
          CREATE_PUBLIC_THREADS: false,
          CREATE_PRIVATE_THREADS: false,
          VIEW_CHANNEL: false,
          SEND_MESSAGES_IN_THREADS: false,
        });
      } catch (error) {}
    });
    msg.channel.send("roles created!");
  } else {
    misusedCommand(msg)
  }
};

export { handleOnboarding };
