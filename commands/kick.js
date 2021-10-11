const discord = require('discord.js');
module.exports = { 
    name: "kick",
    description: "kick someone",
    botPerms: ["MANAGE_ROLES", "MANAGE_CHANNELS", "BAN_MEMBERS"],
    run: async(client, message, args) => {
        const checkIsSuperuser = async (msg) => {
            return await msg.member.roles.cache.some((role) => role.name === 'superuser');
        };
    
        if(!checkIsSuperuser) return "You are not a Superuser!"
        
        if(!checkIsSuperuser){
            let target = message.mentions.members.first()

            if(!target) return message.reply("Please mention someone to kick!")

            if(target.id === message.author.id) {
                return message.reply("You cannot kick yourself!")
            }

            let reason = args.slice(1).join(' ')

            if(!reason) return message.reply("Please give a reason!")

            let kick123 = new discord.MessageEmbed()
            .setColor('#88ca7f')
            .addField(target.user.tag, ' **has been kicked!**')

            await message.channel.send({ embeds: [kick123]})
            console.log(target.user.tag, "has been kicked by", message.author.tag)
            await target.kick({reason:reason})
            
        }

}

}