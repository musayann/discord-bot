import {
  BACKEND_DEVELOPER_MESSAGE,
  FRONTEND_DEVELOPER_MESSAGE,
  ONBOARDING_CHANNEL,
  PRODUCT_DESIGNER_MESSAGE,
  PRODUCT_MANAGER_MESSAGE,
  VERIFY_USER_MESSAGE,
} from "../guild/constants";
import {
  BACKEND_DEVELOPER_ADVANCED,
  BACKEND_DEVELOPER_BEGINNER,
  BACKEND_DEVELOPER_INTERMEDIATE,
  FRONTEND_DEVELOPER_ADVANCED,
  FRONTEND_DEVELOPER_BEGINNER,
  FRONTEND_DEVELOPER_INTERMEDIATE,
  PRODUCT_DESIGNER_ADVANCED,
  PRODUCT_DESIGNER_BEGINNER,
  PRODUCT_DESIGNER_INTERMEDIATE,
  PRODUCT_MANAGER_ADVANCED,
  PRODUCT_MANAGER_BEGINNER,
  PRODUCT_MANAGER_INTERMEDIATE,
} from "../roles";

const eventName = "messageReactionAdd";
const once = false;
const execute = async (client: any, reaction: any, user: any): Promise<void> => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  // ensure the user is not a bot
  if (user.bot) return;
  // ensure reaction happens in a particular guild
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id != ONBOARDING_CHANNEL) return;

  const beginner = "1️⃣";
  const intermediate = "2️⃣";
  const advanced = "3️⃣";

  const member = reaction.message.guild.members.cache.get(user.id);

  const { name } = reaction.emoji;

  if (reaction.message.id == FRONTEND_DEVELOPER_MESSAGE) {
    switch (name) {
      case beginner:
        // get the user that reacted
        await member.roles.remove(FRONTEND_DEVELOPER_INTERMEDIATE);
        await member.roles.remove(FRONTEND_DEVELOPER_ADVANCED);
        await member.roles.add(FRONTEND_DEVELOPER_BEGINNER);

        break;

      case intermediate:
        // get the user that reacted
        await member.roles.remove(FRONTEND_DEVELOPER_ADVANCED);
        await member.roles.remove(FRONTEND_DEVELOPER_BEGINNER);
        await member.roles.add(FRONTEND_DEVELOPER_INTERMEDIATE);

        break;

      case advanced:
        // get the user that reacted
        await member.roles.remove(FRONTEND_DEVELOPER_BEGINNER);
        await member.roles.remove(FRONTEND_DEVELOPER_INTERMEDIATE);
        await member.roles.add(FRONTEND_DEVELOPER_ADVANCED);

        break;

      default:
        break;
    }

    return;
  }

  if (reaction.message.id == BACKEND_DEVELOPER_MESSAGE) {
    switch (name) {
      case beginner:
        // get the user that reacted
        await member.roles.remove(BACKEND_DEVELOPER_ADVANCED);
        await member.roles.remove(BACKEND_DEVELOPER_INTERMEDIATE);
        await member.roles.add(BACKEND_DEVELOPER_BEGINNER);

        break;

      case intermediate:
        // get the user that reacted

        await member.roles.remove(BACKEND_DEVELOPER_BEGINNER);
        await member.roles.remove(BACKEND_DEVELOPER_ADVANCED);

        await member.roles.add(BACKEND_DEVELOPER_INTERMEDIATE);
        break;

      case advanced:
        // get the user that reacted
        await member.roles.remove(BACKEND_DEVELOPER_BEGINNER);

        await member.roles.remove(BACKEND_DEVELOPER_INTERMEDIATE);
        await member.roles.add(BACKEND_DEVELOPER_ADVANCED);

        break;

      default:
        break;
    }
    return;
  }

  if (reaction.message.id == PRODUCT_DESIGNER_MESSAGE) {
    switch (name) {
      case beginner:
        // get the user that reacted
        await member.roles.remove(PRODUCT_DESIGNER_INTERMEDIATE);
        await member.roles.remove(PRODUCT_DESIGNER_ADVANCED);
        await member.roles.add(PRODUCT_DESIGNER_BEGINNER);

        break;

      case intermediate:
        // get the user that reacted
        await member.roles.remove(PRODUCT_DESIGNER_BEGINNER);
        await member.roles.remove(PRODUCT_DESIGNER_ADVANCED);
        await member.roles.add(PRODUCT_DESIGNER_INTERMEDIATE);

        break;

      case advanced:
        // get the user that reacted
        await member.roles.remove(PRODUCT_DESIGNER_BEGINNER);
        await member.roles.remove(PRODUCT_DESIGNER_INTERMEDIATE);
        await member.roles.add(PRODUCT_DESIGNER_ADVANCED);

        break;

      default:
        break;
    }
    return;
  }

  if (reaction.message.id == PRODUCT_MANAGER_MESSAGE) {
    switch (name) {
      case beginner:
        // get the user that reacted
        await member.roles.remove(PRODUCT_MANAGER_INTERMEDIATE);
        await member.roles.remove(PRODUCT_MANAGER_ADVANCED);
        await member.roles.add(PRODUCT_MANAGER_BEGINNER);

        break;

      case intermediate:
        // get the user that reacted
        await member.roles.remove(PRODUCT_MANAGER_BEGINNER);
        await member.roles.remove(PRODUCT_MANAGER_ADVANCED);
        await member.roles.add(PRODUCT_MANAGER_INTERMEDIATE);

        break;

      case advanced:
        // get the user that reacted
        await member.roles.remove(PRODUCT_MANAGER_BEGINNER);
        await member.roles.remove(PRODUCT_MANAGER_INTERMEDIATE);
        await member.roles.add(PRODUCT_MANAGER_ADVANCED);

        break;

      default:
        break;
    }
    return;
  }

  if (reaction.message.id == VERIFY_USER_MESSAGE) {
    member.send(
      `Hello ${member.user.username}, Welcome to Dacade. Lets get your account verified. Please type your Dacade email address to get verified`
    );
  }

  return;
};
export { eventName, once, execute };
