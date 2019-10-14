import { Message, Collection } from "discord.js";
import { Options } from "../interfaces/options";
const messages = new Collection();
/**
 * @param {Message} message
 * @param {Options} options - Options: messageLimit, warnUser, deleteMessage, muteUser, maxSpam
 */

export function antiSpam(message: Message, options: Options = { messageLimit: 3, maxSpam: 3, deleteMessage: true}){
    console.log("This ain't finished!");
    if(!options.messageLimit) return Error("No messageLimit provided!");
    if(!options.maxSpam) return Error("No maxSpam provided!");
}