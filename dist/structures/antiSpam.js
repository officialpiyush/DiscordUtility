"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const formatString = (toFormat, message) => {
	return toFormat
		.replace(/{@user}/g, message.author.toString())
		.replace(/userTag/g, message.author.tag)
		.replace(/{channel_name}/g, message.channel.toString());
};
class AntiSpam extends events_1.EventEmitter {
	constructor(options) {
		super();
		this.warn = (message) => {
			this.emit("warnAdd", message.member);
			if (this.options.deleteMessage) {message.delete();}
			this.cache.push({ warn: { author: message.author.id } });
			if (this.options.warnMessage) {message.channel.send(formatString(this.options.warnMessage, message)).then((msg) => msg.delete(5000));}
		};
		this.ban = (message) => {
			this.emit("banAdd", message.member);
			if (this.options.deleteMessage) {message.delete();}
			if (this.options.banMessage) {message.channel.send(formatString(this.options.banMessage, message));}
			message.member.ban("Spamming!");
		};
		this.kick = (message) => {
			this.emit("kickAdd", message.member);
			if (this.options.deleteMessage) {message.delete();}
			this.cache.push({ kick: { author: message.author.id } });
			if (this.options.kickMessage) {message.channel.send(formatString(this.options.kickMessage, message)).then((msg) => msg.delete(5000));}
			message.member.kick("Spamming!");
		};
		this.clearCache = () => {
			this.emit("reset");
			this.cache = [];
		};
		if (!options) {options = { muteUser: true, maxInterval: 5000, kickUser: true, banUser: true, ignoreBots: true, warnUser: true, deleteMessage: true, messageLimit: 3 };}
		if (!options.messageLimit) {options.messageLimit = 3;}
		this.cache = [];
		this.options = options;
		this.warn = this.warn.bind(this);
		this.ban = this.ban.bind(this);
		this.kick = this.kick.bind(this);
		this.clearCache = this.clearCache.bind(this);
		setInterval(this.clearCache, this.options.maxInterval || 5000);
	}
	checkSpam(message) {
		if (!message.member) {throw Error("Unfetched member detected!");}
		if (message.author.id === message.client.user.id) {return;}
		if (this.options.ignoreBots && message.author.bot) {return;}
		if (this.options.ignoredGuilds && this.options.ignoredGuilds.includes(message.guild.id)) {return;}
		if (this.options.ignoredRoles && this.options.ignoredRoles.some((role) => message.member.roles.has(role))) {return;}
		if (this.options.ignoredUsers && this.options.ignoredUsers.includes(message.author.id)) {return;}
		this.cache.push({ message: { author: message.author.id } });
		const messages = this.cache.filter((x) => x.message.author === message.author.id).length;
		const warned = this.cache.filter((x) => x.warn.author === message.author.id);
		if (messages >= this.options.messageLimit && warned[0]) {return this.kick(message);}
		if (this.cache.filter((x) => x.kick.author === message.author.id)[0] && messages >= 3) {return this.ban(message);}
		if (!warned[0] && messages >= this.options.messageLimit) {return this.warn(message);}
	}
}
exports.AntiSpam = AntiSpam;

