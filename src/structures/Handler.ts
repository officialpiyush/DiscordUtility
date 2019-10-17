import { Dirs } from "../interfaces/dirs";
import { readdir } from "fs";
import { Collection } from "discord.js";
import path from "path";
/**
 * @param {Any} client - Pass in your Discord Client
 */
export class Handler {
    bot: any;
    commandFolder: string;
    eventFolder: string;
    prefix: string;
    constructor(client: any, dirs: Dirs, prefix: string, runCommands: boolean) {
        this.bot = client;
        this.commandFolder = dirs.commandFolder;
        this.eventFolder = dirs.eventFolder;
        this.prefix = prefix;

        this.bot.commands = new Collection();
        this.bot.aliases = new Collection();

        this.bot.on("message", async (message: any) => {
            if (!runCommands) return;
            if (!message.content.startsWith(this.prefix)) return;

            const args = message.content.slice(this.prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            const command = this.getCommand(cmd) || this.getCommand(this.getAlias(cmd));

            if (!command) return;

            try {
                await command.run(this.bot, message, args);
            } catch (e) {
                console.log(e);
            };
        });
    }
    loadCommands(): this {
        readdir(this.commandFolder, (err, files) => {
            files.filter((f: string) => {
                if (!f.endsWith(".js")) console.log(f + " isn't a .js file!");

                return f.endsWith(".js");
            })
            for (const file of files) {
                try {
                    const cmd = require(`${path.dirname(require.main!.filename)}/${this.commandFolder}/${file}`);

                    this.bot.commands.set(cmd.name, cmd);

                    if (cmd.aliases) cmd.aliases.forEach((alias: string) => this.bot.aliases.set(alias, cmd.name));
                    console.log(`Successfully loaded: ${file}`);

                } catch (e) {
                    console.log(`Couldn't load ${file}, error: ${e.toString()}`);
                }
            }
        })
        return this;
    }
    loadEvents(): this {
        readdir(this.eventFolder, (err: any, events: string[]) => {
            if (err) console.log(err)
            events.filter((f: string) => {
                if (!f.endsWith(".js")) console.log(f + " isn't a .js file!");

                return f.endsWith(".js")
            });

            for (const event of events) {
                const evt = require(`${path.dirname(require.main!.filename)}/${this.eventFolder}/${event}`);

                const eName = event.split(".")[0];
                try {
                    this.bot.on(eName, evt.bind(null, this.bot));
                    console.log(`Successfully loaded: ${event}`);
                } catch (e) {
                    console.log(`You didn't export correctly at ${event}`);
                }
            }
        })
        return this;
    }
    getCommand(command: string): any {
        return this.bot.commands.get(command) || null;
    }
    getAlias(alias: string): any {
        return this.bot.aliases.get(alias) || null;
    }
    getAllCommands(): any[] {
        return this.bot.commands.map((x: object) => x) || null;
    }
}