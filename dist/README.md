
## DiscordUtility
<a href="https://www.npmjs.com/package/discordutility" rel="nofollow"><img src="https://badgen.net/npm/dt/discordutility" alt="downloads"></a>
<a href="https://github.com/Devs-Meetup/DiscordUtility" rel="nofollow"><img src="https://badgen.net/github/stars/Devs-Meetup/DiscordUtility" alt="stars"></a>
<a href="https://github.com/Devs-Meetup/DiscordUtility/blob/master/LICENSE" rel="nofollow"><img src="https://badgen.net/github/license/Devs-Meetup/discordutility" alt="license"></a>
<br/>
DiscordUtility is an utility Package that provides features, such as:

- An advanced command handler
- A checkCurse Function
- A convertMS Function
- A promptMessage Function

## Installation

```js
npm  i  discordutility
```
or if you use yarn
```js
yarn  add  discordutility
```
## Example
```js
const { Client } = require("discord.js");
const { Handler } = require("discordutility");
const bot = new Client();
bot.handler = new Handler(bot, { commandFolder: "commands", eventFolder: "events" }, "!", true);
```
```js
//Event Folder, message.js (events/message.js)
const { checkCurse } = require("discordutility");
module.exports = (bot, message) => {
	if(checkCurse(message, true)) return message.reply("Do not swear >:(!");
};
```
```js
//Command Folder, help.js (commands/help.js)
module.exports = {
name:"help",
aliases: ["h"],
run: (bot, message, args) => {
		message.reply("Hello World!");
	}
}
```
## In Progress
- An antispam system
## Links
-  [NPM](https://www.npmjs.com/package/discordutility)
-  [Github](https://github.com/Devs-Meetup/DiscordUtility)
-  [Docs](https://discordutility.js.org)