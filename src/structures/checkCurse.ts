import { Message } from "discord.js";
/**
 * @param {Message} message - A Discord.js Message
 * @param {Boolean} [defaultWords=true]
 * @param {Array} extraWords
 * @returns {Boolean}
 */
export function checkCurse(message: Message, defaultWords: boolean = true, extraWords: string[]) {
    let swearWords: string[] = [];

    if (!defaultWords && !extraWords || extraWords.length == 0) return false;
    if (defaultWords) swearWords = ["fuck", "chaosisnotcool", "ass", "nigga", "nigger", "asshole", "pussy", "fucker", "fucking", "bitch"];
    if (extraWords && extraWords.length > 0)
        for (const swearWord of extraWords) swearWords.push(swearWord)

    const deserialized = message.content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (swearWords.some((swearWord) => deserialized.split(" ").includes(swearWord))) return true;
    return false;
}