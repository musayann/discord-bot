// import { Captcha } from "discord.js-captcha";
// import { GUILD_ID } from "../guild/constants";
// import { MessageEmbed } from "discord.js";
import { HUMAN_ROLE } from "../roles";
import { Captcha } from "captcha-canvas";
import { MessageEmbed } from "discord.js";

const eventName = "guildMemberAdd";
const once = false;

const execute = async (client: any, member: any) => {
  console.log("joined server!");

  // const captcha = new Captcha(client, {
  //   guildID: GUILD_ID,
  //   roleID: HUMAN_ROLE,
  //   // channelID: "Text Channel ID Here", //optional
  //   sendToTextChannel: false, //optional, defaults to false
  //   kickOnFailure: true, //optional, defaults to true. whether you want the bot to kick the user if the captcha is failed
  //   caseSensitive: true, //optional, defaults to true. whether you want the captcha responses to be case-sensitive
  //   attempts: 5, //optional, defaults to 1. number of attempts before captcha is considered to be failed
  //   timeout: 60000, //optional, defaults to 60000. time the user has to solve the captcha on each attempt in milliseconds
  //   showAttemptCount: true, //optional, defaults to true. whether to show the number of attempts left in embed footer
  //   customPromptEmbed: new MessageEmbed().setAuthor("Captcha"), //customise the embed that will be sent to the user when the captcha is requested
  //   customSuccessEmbed: new MessageEmbed()
  //     .setAuthor("Awesome!")
  //     .setDescription(
  //       "Your human verification was successful and have been granted access to the server!. Head over to the 🧳onboarding channel. "
  //     ), //customise the embed that will be sent to the user when the captcha is solved
  //   customFailureEmbed: new MessageEmbed()
  //     .setAuthor("Verification failed")
  //     .setDescription(
  //       "Your verification did not go through. To retry this verification kindly rejoin the server. Thank you!."
  //     ), //customise the embed that will be sent to the user when they fail to solve the captcha
  // });

  const captcha = new Captcha();
  captcha.async = true;
  captcha.addDecoy();
  captcha.drawTrace();
  captcha.drawCaptcha();

  console.log({ captcha });

  const image = await captcha.png;

  console.log({ image });
  // const captchaAttachment = new MessageAttachment(image, "captcha");
  const captchaEmbed = new MessageEmbed();
  captchaEmbed

    .setDescription(
      `Hello ${member.user.username}, I'm DacBot, Dacade's helper bot. Please enter the CAPTCHA below to prove your humanity.`
    )
    .setImage("attachment://captcha.png");

  console.log(captcha.text);

  try {
    const msg = await member.send({
      files: [{ name: "captcha.png", attachment: image }],
      embeds: [captchaEmbed],
      // content: `Hello ${member.user.username}, I'm DacBot, Dacade's helper bot. Please enter the CAPTCHA below to prove your humanity.`,
    });

    const filter = (message: any) => {
      if (message.author.id !== member.id) return false;
      if (message.content === captcha.text) return true;
      else {
        member.send("Wrong captcha, Try again!.");
        return false;
      }
    };

    try {
      const response = await msg.channel.awaitMessages({
        filter,
        max: 1,
        time: 60000,
        errors: ["time"],
      });

      if (response) {
        member.roles.add(HUMAN_ROLE);
        member.send(
          "Your human verification was successful and have been granted access to the server!. Head over to the 🧳onboarding channel. "
        );
      }
    } catch (error) {
      await member.send(
        "Your verification did not go through. To retry this verification kindly rejoin the server. Thank you!."
      );
      member.kick("Your captcha verification failed.");

      //  when the user runs out of time
    }
  } catch (error) {
    console.log("cannot send messages to this user", { error });
  }
};

export { eventName, once, execute };
