import Discord from "discord.js";
import { argParse } from "../utils/argParse";
import {
  ONBOARDING_TRIGGER,
  SUPERUSER_TRIGGER,
  EXIT_TRIGGER,
  MUTE_TRIGGER,
  UNMUTE_TRIGGER,
  MEMBER_INFO_TRIGGER,
  BAN_TRIGGER,
  WARN_TRIGGER,
} from "../constants/triggers";
import { handleOnboarding } from "./utilityControllers/onboarding";
import { root, exitRoot } from "./moderationControllers/su";
import { muteUser, unmuteUser } from "./moderationControllers/mute";
import { warnUser } from "./moderationControllers/warn";

/**
 * Handle a message that is sent to the bot and parse it for
 * commands and then if there is a command that is found matching
 * the trigger then execute that command;
 *
 * @param {Discord.Message} - msg
 * @returns {Promise<void>}
 */

const HandleMessage = async (msg: Discord.Message): Promise<void> => {
  const command = msg.content.split(" ")[0];
  if (command.startsWith("$")) {
    const args =
      msg.content.split(" ").length >= 2
        ? argParse(msg.content.substring(msg.content.indexOf(" ") + 1))
        : {};

    switch (command) {
      case ONBOARDING_TRIGGER:
        return handleOnboarding(msg, args);
      case SUPERUSER_TRIGGER:
        return root(msg);
      case EXIT_TRIGGER:
        return exitRoot(msg);
      case MUTE_TRIGGER:
        return muteUser(msg, args);
      case UNMUTE_TRIGGER:
        return unmuteUser(msg);
      case WARN_TRIGGER:
        return warnUser(msg, args);
    }
  }
};

export default HandleMessage;
