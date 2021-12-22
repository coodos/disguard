import Discord from "discord.js";
import { createEmbed } from "../../utils/embeds";

const commands = [
  {
    name: "su",
    desc: "Gives sudoers superuser role",
    flags: [],
    example: "$su",
  },
  {
    name: "exit",
    desc: "Exits out of the superuser role",
    flags: [],
    example: "$exit",
  },
  {
    name: "config",
    desc: "creates roles for the server",
    example: "$config --superuser kamisama --sudoers kami --muted baka",
    flags: [
      {
        name: "--superuser",
        value: "[REQUIRED] set name for superuser role",
      },
      {
        name: "--sudoers",
        value: "[REQUIRED] set name for the sudoers role",
      },
      {
        name: "--muted",
        value: "[REQUIRED] set name for the muted role",
      },
    ],
  },

  {
    name: "mute",
    desc: "mute a user",
    example: "mute @user --time 86400",
    flags: [
      {
        name: "--time",
        value: "Time in seconds to mute the user for",
      },
    ],
  },
  {
    name: "unmute",
    desc: "unmute the user pinged",
    example: "unmute @user",
    flags: [],
  },
  {
    name: "kick",
    desc: "kick the user pinged",
    example: "kick @user --reason bruh",
    flags: [
      {
        name: "--reason",
        value: "[OPTIONAL] Reason the user was kicked for",
      },
    ],
  },
  {
    name: "ban",
    desc: "ban a user for a few days or something",
    example: "$ban @user --days 10 --reason bruh",
    flags: [
      {
        name: "--days",
        value: "[OPTIONAL] Days to ban for",
      },
      {
        name: "--reason",
        value: "[OPTIONAL] reason for the ban",
      },
    ],
  },
  {
    name: "warn",
    desc: "issue a warning to a pinged user",
    example: "$warn @user --reason trolling others",
    flags: [
      {
        name: "--reason",
        value: "[OPTIONAL] reason for the warning",
      },
    ],
  },
  {
    name: "warnings",
    desc: "See the history of previous infractions of a user",
    example: "$warnings @user",
    flags: [],
  },
  {
    name: "purge",
    desc: "purge specified number of messages from channel LESS THAN 100",
    example: "$purge --count 69",
    flags: [
      {
        name: "--count",
        value: "[REQUIRED] number of messages to be deleted LESS THAN 100",
      },
    ],
  },
];

/**
 * Handle the help message and find the manual for this shit
 *
 * @param {Discord.Message}
 */

const HandleHelp = async (msg: Discord.Message) => {
  const msgSplit = msg.content.split(" ");
  if (!msgSplit[1]) {
    let commandsString = "";
    for (const cmd of commands) {
      commandsString =
        commandsString +
        `\n**${cmd.name}**\ntrigger: \`$${cmd.name}\`\n${cmd.desc}\n`;
    }
    createEmbed(
      "Help is here!",
      `Disguard is a result of my obsession with linux and linux like commands, the idea is that all mod commands are locked behind a superuser and you only get to be a superuser WHEN you are root, till then all users appear as normal and people behave exactly like they would normally and not when they know they can face consequences\n\nTo get help related to a specific command type\n\`$man <command>\`\n\n**Example**\n\`$man ban\`\n\n**Commands**\n${commandsString}`,
      msg.channel,
      "success"
    );
  } else {
    const commandName = msgSplit[1];
    const command = commands.find((cmd) => cmd.name === commandName);
    if (command) {
      const embed = new Discord.MessageEmbed()
        .setTitle(commandName)
        .setColor("GREEN")
        .setDescription(
          `${command.desc}\n\n**Example**\`\`\`${command.example}\`\`\``
        )
        .setFields(command.flags);
      msg.channel.send({ embeds: [embed] });
    } else {
      createEmbed(
        ":(",
        `Command ${commandName} not found`,
        msg.channel,
        "warn"
      );
    }
  }
};

export { HandleHelp };
