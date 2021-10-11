const { MessageEmbed } = require('discord.js')


  module.exports = {
    name:"userinfo",
    description:"user info embed!",
    execute(message, args, Discord){
        const { guild, channel } = message
        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)
        const userInfo = new Discord.MessageEmbed()
        .setColor('#ffcc00')
        .setTitle('User Info')
        .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
        .addFields(
            {
            name: 'User tag',
            value: `${user.tag}`,

            },
            {
            name: 'Bot?',
            value: `${user.bot}`,

            },
            {
            name: 'Nickname',
            value: `${member.nickname || 'None'}`,

            },
            {
            name: 'Joined Server',
            value: `${new Date(member.joinedTimestamp).toLocaleDateString()}`,

            },
            {
            name: 'Joined Discord',
            value: `${new Date(user.createdTimestamp).toLocaleDateString()}`,
   
            },
            {
            name: 'Roles',
            value: `${member.roles.cache.size - 1}`,
    
            }
    
        )
        message.channel.send({ embeds: [userInfo]});
    }
  }