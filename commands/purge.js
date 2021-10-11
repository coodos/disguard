const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

module.exports = {
  name:"purge",
  description:"help me embed!",
  execute(message, args, Discord){
    const checkIsSuperuser = async (msg) => {
        return await msg.member.roles.cache.some((role) => role.name === 'superuser');
    };

    if(!checkIsSuperuser) return "You are not a Superuser!"
    
    let amount = Number(args[1]);
    client.on('message', message =>{
        message.channel.bulkDelete(amount)
        }
    )




    const purgee = new Discord.MessageEmbed()
    .setColor('#41D15C')
    .setTitle('Purge result')
    .addFields(
      {name : "Results:", value:`Purged ${amount} messages!`}
    )
    .setFooter('Purged!');
    message.channel.send({ embeds: [purgee]});
  }
}
