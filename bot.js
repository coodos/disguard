const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const fs = require('fs')
const mongoose = require('mongoose')

const config = require('./config')
const prefix = '$';


client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

mongoose
    .connect(config.dbToken, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((m) => {
        console.log("Connected to Database")
    })
    .catch((err) => console.log(err))


client.once('ready', () => {
  console.log('Disguard GG is online!');
});








client.on('message', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();


  if(command === 'help'){
    client.commands.get('helpMe').execute(message, args, Discord)
  }

  if(command === 'fa'){
    client.commands.get('fact').execute(message, args, Discord)
  }

  if(command === 'qu'){
    client.commands.get('quote').execute(message, args, Discord)
  }
  if (command === 'user'){
  client.commands.get('userinfo').execute(message, args, Discord)
  }

  if (command === 'ban'){
    client.commands.get('ban').run(client, message, args)
  }

  if (command === 'purge'){
    client.commands.get('purge').execute(client, message, args)
  }

  if (command === 'kick'){
    client.commands.get('kick').run(client, message, args)
  }

  if (command === 'su'){
    client.commands.get('su').run(client, message, args)
  }
  



  const messageStart = message.content.split(' ')[0];


    

  const sudoRole = message.guild.roles.cache.find(role => role.name == "sudoer")
  const superRole = message.guild.roles.cache.find(role => role.name == "superuser")
  
  if(!sudoRole) message.guild.roles.create({
    name: 'sudoer',
    color: "WHITE"
    })

  if(!superRole) message.guild.roles.create({
    name: 'superuser',
    color: 'RED',
    permissions : ['BAN_MEMBERS', "KICK_MEMBERS", "CHANGE_NICKNAME", "MANAGE_GUILD", "MANAGE_NICKNAMES", "MANAGE_CHANNELS"]
    })


});








client.login(config.token)