import { Message, Client } from "discord.js";
import { Options } from "../interfaces/options";
import { EventEmitter } from "events";

const formatString = (string: string, message: Message) => {
  return string
    .replace(/{@user}/g, message.author.toString())
    .replace(/userTag/g, message.author.tag)
    .replace(/{channel_name}/g, message.channel.toString())
}

let users = [],
  warnedUsers = [],
  cachedMessages = [];

/**
 * @param {Client} bot - Your Discord.Client;
 * @param {Options} options - Options: messageLimit, warnUser, deleteMessage, muteUser, maxSpam
 */

export class antiSpam extends EventEmitter {
  client: Client;
  constructor(client: Client, options: Options = { messageLimit: 3, maxSpam: 3, deleteMessage: true }) {
    super();
    this.client = client;
    this.client.on("message", (message: Message) => {

    });
  }
};