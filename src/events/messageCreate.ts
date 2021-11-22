import { GUILD_ID, GENERAL_CHANNEL_ID } from "../guild/constants";
import { HUMAN_ROLE, VERIFIED_ROLE } from "../roles";
import { checkStringForEmail, fetchUsernameByEmail } from "../utils/helper";

const eventName = "messageCreate";
const once = false;
const execute = async (client: any, message: any) => {
  const { channel, content, author } = message;
  let targetGuild;
  let owner;
  let roles;
  let email;
  let displayName;
  console.log("created!!!!");

  console.log({ author });

  if (author.bot) return;

  switch (channel.type) {
    case "DM":
      try {
        targetGuild = await client.guilds.fetch(GUILD_ID);
      } catch (error) {
        await message.reply("Kindly join the Dacade server.");
        return;
      }

      try {
        owner = await targetGuild.members.fetch(author.id);
      } catch (error) {
        await message.reply("Kindly join the Dacade server.");
        return;
      }

      roles = owner._roles;

      // check if the user has completed the captcha bot
      // if hasnt then do nothing here so the captcha verification contines
      if (roles.indexOf(HUMAN_ROLE) < 0) {
        return;
      }

      if (roles.indexOf(VERIFIED_ROLE) > -1) {
        await message.reply(
          "You have already been verified. My purpose has been accomplished."
        );
        return;
      }

      email = checkStringForEmail(content);
      if (!email) {
        await message.reply("Please enter a valid email");
        return;
      }

      displayName = await fetchUsernameByEmail(email);

      if (!displayName) {
        await message.reply(
          "Ooops! I couldn't find this email registered on the Dacade servers. Please signup at www.dacade.org to continue!"
        );
        return;
      }

      await owner.roles.add(VERIFIED_ROLE);
      await message.reply(
        "Thanks for entering your email. You have been verified successfully"
      );

      await owner.setNickname(`@${displayName}`);

      await client.channels.cache
        .get(GENERAL_CHANNEL_ID)
        .send(`Welcome ${author.toString()} to this server`);
      break;

    case "GUILD_TEXT":
      break;

    default:
      break;
  }
};

export { eventName, once, execute };
