import Discord from "discord.js";

/**
 * Create a generic embed
 *
 * @param {String} emoticon
 * @param {String} body
 * @param {Discord.TextBasedChannels} channel
 */

const createEmbed = async (
  emoticon: string,
  body: string,
  channel: Discord.TextBasedChannels,
  type: "warn" | "success" | "info"
) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(emoticon)
    .setDescription(body)
    .setColor(
      type === "warn" ? "RED" : type === "success" ? "GREEN" : "LIGHT_GREY"
    );
  channel.send({ embeds: [embed] });
};

/**
 * create a sudo warning embed
 *
 * @param {Discord.Message} message
 */

const sudoersWarningPopup = (msg: Discord.Message) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("( ಠ_ಠ)")
    .setDescription(
      `${msg.author.username} is not in the sudoers file. this incident will be reported`
    )
    .setColor("RED");
  msg.channel.send({ embeds: [embed] });
};

/**
 * notRoot error
 *
 * @param {Discord.Message}
 */

const notRootError = async (msg: Discord.Message) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("( ಠ_ಠ)")
    .setDescription(
      "error: you cannot perform this operation unless you are root"
    )
    .setColor("RED");
  msg.channel.send({ embeds: [embed] });
};

export { createEmbed, sudoersWarningPopup, notRootError };
