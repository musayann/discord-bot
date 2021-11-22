const eventName = "ready";
const once = true;

const execute = (client: { user: { tag: any; }; }) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  console.log(process.env.DISCORD_BOT_TOKEN);
};
export { eventName, once, execute };
