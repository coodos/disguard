import Discord from "discord.js";

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
  if (isAdmin && sudoers && superuser && muted) {
    const rolesCount = msg.member.guild.roles.cache.size;
    await msg.member.guild.roles.create({
      name: sudoers,
      position: rolesCount - 1,
    });
    await msg.member.guild.roles.create({
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
      color: "DARK_ORANGE",
    });
    const mutedRole = await msg.member.guild.roles.create({
      name: muted,
      position: rolesCount - 3,
    });
    msg.member.guild.channels.cache.forEach(async (channel: any) => {
      await channel.permissionOverwrites.edit(mutedRole, {
        SPEAK: false,
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
      });
    });
  }
};

export { handleOnboarding };
