const {RoleManager, Client, MessageEmbed}= require('discord.js');
const { checkIsAdmin, checkIsSuperuser } = require('../important/checkAdmin.js')
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

module.exports = {
    name: "su",
    run: async(client, message, args) => {
        if (await checkIsAdmin(message)) {
            var superuser = await message.guild.roles.cache.find(
              (role) => role.name === 'superuser'
            );
            if (
              await message.member.roles.cache.some((role) => role.name === 'superuser')
            ) {
              message.member.roles.remove(superuser);
              message.channel.send('(◉ܫ◉) All done...');
            } else {
              message.member.roles.add(superuser);
              message.channel.send(`(⌐■_■) Deal with it B) \`${message.author.username}\` is now playing life in creative mode`);
            }
          } 
    }

}
