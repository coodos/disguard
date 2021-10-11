import Discord, { Intents } from "discord.js";
import { BOT_TOKEN, MONGO_URI } from "./config";
import { connectToDB } from "./utils/mongo";

const main = async () => {
  await connectToDB(MONGO_URI);

  const client = new Discord.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_MESSAGES,
    ],
  });

  client.on("messageCreate", (msg: Discord.Message) => {
    console.log(msg);
  });

  client.on("ready", () => {
    console.log(`--> Disguard is up and running!`);
  });

  client.login(BOT_TOKEN);
};

main();
