import { errorEmbed } from '../functions/embeds.js';

const poll = async (msg) => {
  let question = msg.content.split(' ');
  question = question.slice(1, question.length).join(' ');

  if (question) {
    const message = await msg.channel.send(
      `React using the tick or cross to cast your vote\n${question}`
    );
    await message.react('✅');
    await message.react('❌');
    console.log(message);
  } else {
    errorEmbed(msg, ':(', `Question not defined, run \`$poll <qustion>\``);
  }
};

export { poll };
