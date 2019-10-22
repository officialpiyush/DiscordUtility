import { Message } from "discord.js";
/**
 * @param {Message} message - A Discord.js Message
 * @param {Boolean} [defaultWords=true] - Wheather use default curse words or not
 * @param {Array<string>} [extraWords=[]] - An array of more cursed words, if you wana check for more.
 * @returns {Boolean} - Returns true if the message contains cursed words, false if dosen't
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