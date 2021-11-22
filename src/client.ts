import * as fs from "fs";
import { Client, Intents } from "discord.js";


const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    partials: ["MESSAGE", "REACTION", "CHANNEL"],
  });
  
  const eventFiles = fs
    .readdirSync(__dirname + "/events")
    .filter((file) => file.endsWith(".js"));
  
  for (const file of eventFiles) {
    import(`./events/${file}`).then((event) => {
      console.log({event});
      
      if (event.once) {
        client.once(event.eventName, (...args) => event.execute(client, ...args));
      } else {
        client.on(event.eventName, (...args) => event.execute(client, ...args));
      }
    });
  }
  const token = process.env.DISCORD_BOT_TOKEN;
  
  client.login(token);

  export default client;