const discord = require('discord.js');
const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

module.exports = { 
    name: "ban",
    description: "ban someone",
    botPerms: ["MANAGE_ROLES", "MANAGE_CHANNELS", "BAN_MEMBERS"],
    run: async(client, message, args) => {
    
        let { cache } = message.guild.roles

        if(!message.member.roles.cache.has("superuser")) return "You are not a Superuser!"
        
        if(message.member.roles.has("superuser")){
            
            let target = message.mentions.members.first()

            if(!target) return message.reply("Please mention someone to ban!")

            if(target.id === message.author.id) {
                return message.reply("You cannot ban yourself!")
            }

            let reason = args.slice(1).join(' ')

            if(!reason) return message.reply("Please give a reason!")

            let ban123 = new discord.MessageEmbed()
            .setColor('#88ca7f')
            .addField(target.user.tag, ' **has been banned!**')

            message.channel.send({ embeds: [ban123]})
            console.log(target.user.tag, "has been banned by", message.author.tag)
            target.ban({reason:reason})
        
    }


        
}

}