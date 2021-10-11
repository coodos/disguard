const Discord = require('discord.js');
const facts = ['Coding has over 700 languages.', 'Coding will soon be as important as reading.', 'Python was NOT named after a snake.', 'Some programs are designed to steal your data or damage your computer. These programs are called malware.', 'Coders who study and write malware are known as hackers. Those who write malware to commit crimes are known as “black-hat” hackers, and those who write programs to protect against malware are called “white-hat" hackers.', 'NASA’s reusable spacecraft, the Space Shuttle, went into space using a computer designed in the 1970s. It had less code than most of today’s cell phones!', 'Computer games are so popular that the games industry is now worth more than the movie industry!', 'Computer code might look like a foreign language, but it is a language anybody can pick up quickly, with a little practice!', 'Python was released on February 20, 1991', 'The first commercially available language was FORTRAN', 'C++ is considered the hardest language for students to master', 'The two most common languages for game designers to learn are C++ and Java.'];


module.exports = {
    name:"fact",
    description:"fact embed!",
    
    execute(message, args, Discord){
      const helpMe = new Discord.MessageEmbed()
      .setColor('#ffcc00')
      .setTitle('Here is a fact for ya!')
      .addFields(
        {name:'Fact:', value:`${facts[Math.floor(Math.random() * facts.length)]}`},
      )
      message.channel.send({ embeds: [helpMe]});
    }
  }
  