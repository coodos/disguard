const Discord = require('discord.js');
const quotes = ["When you realize nothing is lacking, the whole world belongs to you. Lao Tzu", "What the superior man seeks is in himself; what the small man seeks is in others. Confucius", "To seek is to suffer. To seek nothing is bliss. Bodhidharma", "Wise men don’t judge – they seek to understand. Wei Wu Wei", "When thoughts arise, then do all things arise. When thoughts vanish, then do all things vanish. Huang Po", "Wherever you are, it’s the place you need to be. Maxime Lagacé", "The noble-minded are calm and steady. Little people are forever fussing and fretting. Confucius", "Rest and be kind, you don’t have to prove anything. Jack Kerouac", "Nothing ever goes away until it has taught us what we need to know. Pema Chödrön", "Only the hand that erases can write the true thing. Meister Eckhart", "Where can I find a man who has forgotten words so I can talk with him? Zhuangzi", "When we discover that the truth is already in us, we are all at once our original selves. Dogen", "Life is a balance of holding on and letting go. Rumi", "Wherever you are, be there totally. Eckhart Tolle", "I live by letting things happen. Dogen", "Zen is not some fancy, special art of living. Our teaching is just to live, always in reality, in its exact sense. Shunryu Suzuki", "Forget the years, forget distinctions. Leap into the boundless and make it your home. Zhuangzi", "Before enlightenment; chop wood, carry water. After enlightenment; chop wood, carry water. Buddha", "Who you are is always right. Ming-Dao Deng", "The search for happiness is one of the chief sources of unhappiness. Eric Hoffer", "And when they played they really played. And when they worked they really worked. Dr. Seuss", "Do not seek the truth, only cease to cherish your opinions. Seng-ts’an", "One loses joy and happiness in the attempt to possess them. Masanobu Fukuoka", "Education breeds confidence. Confidence breeds hope. Hope breeds peace. Confucius", "Relax. Nothing is under control. Adi Da"];


module.exports = {
    name:"quote",
    description:"quote embed!",
    
    execute(message, args, Discord){
      const quoteFunc = new Discord.MessageEmbed()
      .setColor('#ffcc00')
      .setTitle('Here is a quote for ya!')
      .addFields(
        {name:'Quote:', value:`${quotes[Math.floor(Math.random() * quotes.length)]}`},
      )
      message.channel.send({ embeds: [quoteFunc]});
    }
  }
  