import { Message } from "discord.js";
/**
 * @param {Message} message - A Discord.js Message
 * @param {Number} time - The time to wait for a returned message
 * @returns {Promise<T>} 
 */
export async function promptMessage(message: Message, time: number = 30000) {
    const filter = (m: Message) => m.author.id === message.author.id;
    return message.channel.awaitMessages(filter, { max: 1, time: time })
        .then(c => c.first() && c.first().content)
}