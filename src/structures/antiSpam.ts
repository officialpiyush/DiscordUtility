import { Message, Client, Role } from "discord.js";
import { Options } from "../interfaces/options";
import { EventEmitter } from "events";

const formatString = (toFormat: string, message: Message) => {
  return toFormat
    .replace(/{@user}/g, message.author.toString())
    .replace(/userTag/g, message.author.tag)
    .replace(/{channel_name}/g, message.channel.toString())
}


/**
 * @param {Client} bot - Your Discord.Client;
 * @param {Options} options
 */

export class AntiSpam extends EventEmitter {
  cache: object[];
  options: Options;
  constructor(options: Options) {
    super();
    if (!options) options = { muteUser: true, maxInterval: 5000, kickUser: true, banUser: true, ignoreBots: true, warnUser: true, deleteMessage: true, messageLimit: 3 }
    if (!options.messageLimit) options.messageLimit = 3;

    this.cache = [];
    this.options = options;

    this.warn = this.warn.bind(this);
    this.ban = this.ban.bind(this);
    this.kick = this.kick.bind(this);
    this.clearCache = this.clearCache.bind(this);

    setInterval(this.clearCache, this.options.maxInterval || 5000);
  }
  checkSpam(message: Message): void {
    if (!message.member) throw Error("Unfetched member detected!");
    if (message.author.id === message.client.user.id) return;
    if (this.options.ignoreBots && message.author.bot) return;
    if (this.options.ignoredGuilds && this.options.ignoredGuilds.includes(message.guild.id)) return;
    if (this.options.ignoredRoles && this.options.ignoredRoles.some((role: string) => message.member.roles.has(role))) return;
    if (this.options.ignoredUsers && this.options.ignoredUsers.includes(message.author.id)) return;

    this.cache.push({ message: { author: message.author.id } });
    const messages = this.cache.filter((x: any) => x.message.author === message.author.id).length;
    const warned = this.cache.filter((x: any) => x.warn.author === message.author.id);

    if (messages >= this.options.messageLimit && warned[0]) return this.kick(message);
    if (this.cache.filter((x: any) => x.kick.author === message.author.id)[0] && messages >= 3) return this.ban(message);
    if (!warned[0] && messages >= this.options.messageLimit) return this.warn(message);
  }

  warn = (message: Message): void => {
    this.emit("warnAdd", message.member);
    if (this.options.deleteMessage) message.delete();
    this.cache.push({ warn: { author: message.author.id } });

    if (this.options.warnMessage)
      message.channel.send(formatString(this.options.warnMessage, message)).then((msg: any) => msg.delete(5000));
  }
  ban = (message: Message): void => {
    this.emit("banAdd", message.member);

    if (this.options.deleteMessage) message.delete();

    if (this.options.banMessage)
      message.channel.send(formatString(this.options.banMessage, message))

    message.member.ban("Spamming!");
  }
  kick = (message: Message): void => {
    this.emit("kickAdd", message.member);

    if (this.options.deleteMessage) message.delete();

    this.cache.push({ kick: { author: message.author.id } });
    if (this.options.kickMessage)
      message.channel.send(formatString(this.options.kickMessage, message)).then((msg: any) => msg.delete(5000))

    message.member.kick("Spamming!");
  }
  clearCache = (): void => {
    this.emit("reset");
    this.cache = [];
  }
};
