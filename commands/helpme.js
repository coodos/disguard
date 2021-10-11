const Discord = require('discord.js');


module.exports = {
  name:"helpMe",
  description:"help me embed!",
  execute(message, args, Discord){
    const helpMe = new Discord.MessageEmbed()
    .setColor('#41D15C')
    .setTitle('Disguard')
    .setDescription('Here to help!')
    .addFields(
      {name:`Here is the Help`, value:"**Hi! This is the help guide of the Disguard Bot. Use ($) as the Prefix!**" },
      {name:`$su`, value:"This will make you live your life in creative mode where you will have access to alot of moderator commands!"},
      {name:`$help`, value:"This will tell you about the bot and its commands!"},
      {name:`$qu`, value:"This will inspire you with a random motivational quote."},
      {name:`$fa`, value:"This will tell you one random fact."},
      {name:`$ban`, value:"This will ban a user!"},
      {name:`$kick`, value:"This will kick a user"},
      {name:`$user (user mention)`, value:"This will return the information of the mentioned user. (No user mention will just return your user information)"},
    )
    .setFooter('Helping manual!');
    message.channel.send({ embeds: [helpMe]});
  }
}
