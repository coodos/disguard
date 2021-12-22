import Discord, { Message } from "discord.js";
import {
  notRootError,
  sudoersWarningPopup,
  createEmbed,
  misusedCommand,
} from "../../utils/embeds";
import { isSudoer, isSuperuser } from "../../utils/permissions";

const purgeMessages = async (msg: Discord.Message, args: Object) => {
    if (await isSudoer(msg)) {
      if (await isSuperuser(msg)) {
        interface IArgs {
            count?: string;
          }
        const { count }: IArgs = args;
        const numMsg = Number(count)
        if (!(isNaN(numMsg))){
            if (numMsg <= 100 && numMsg >= 1) {
                if (msg.channel.type == "GUILD_TEXT") {
                    await msg.channel
                    .bulkDelete(numMsg)
                    .catch((error) => console.log(error))
                    createEmbed(
                        "(^▼ｪ▼ﾒ^)",
                        ` I DEYEET!!!!`,
                        msg.channel,
                        "warn"
                      );
                } else {
                    misusedCommand(msg)
                }
            } else {
                misusedCommand(msg)
            }
        } else {
            misusedCommand(msg)
        }
      } else {
        notRootError(msg);
      }
    } else {
      sudoersWarningPopup(msg);
    }
  };

  export { purgeMessages }