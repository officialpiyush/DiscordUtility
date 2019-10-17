"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
class Handler {
    constructor(client, dirs, prefix, runCommands) {
        this.bot = client;
        this.commandFolder = dirs.commandFolder;
        this.eventFolder = dirs.eventFolder;
        this.prefix = prefix;
        this.bot.commands = new discord_js_1.Collection();
        this.bot.aliases = new discord_js_1.Collection();
        this.bot.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
            if (!runCommands)
                return;
            if (!message.content.startsWith(this.prefix))
                return;
            const args = message.content.slice(this.prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            const command = this.getCommand(cmd) || this.getCommand(this.getAlias(cmd));
            if (!command)
                return;
            try {
                yield command.run(this.bot, message, args);
            }
            catch (e) {
                console.log(e);
            }
            ;
        }));
    }
    loadCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            fs_1.readdir(this.commandFolder, (err, files) => {
                files.filter((f) => {
                    if (!f.endsWith(".js"))
                        console.log(f + " isn't a .js file!");
                    return f.endsWith(".js");
                });
                for (const file of files) {
                    try {
                        const cmd = require(`${path_1.default.dirname(require.main.filename)}/${this.commandFolder}/${file}`);
                        this.bot.commands.set(cmd.name, cmd);
                        if (cmd.aliases)
                            cmd.aliases.forEach((alias) => this.bot.aliases.set(alias, cmd.name));
                        console.log(`Successfully loaded: ${file}`);
                    }
                    catch (e) {
                        console.log(`Couldn't load ${file}, error: ${e.toString()}`);
                    }
                }
            });
        });
    }
    loadEvents() {
        fs_1.readdir(this.eventFolder, (err, events) => {
            if (err)
                console.log(err);
            events.filter((f) => {
                if (!f.endsWith(".js"))
                    console.log(f + " isn't a .js file!");
                return f.endsWith(".js");
            });
            for (const event of events) {
                const evt = require(`${path_1.default.dirname(require.main.filename)}/${this.eventFolder}/${event}`);
                const eName = event.split(".")[0];
                try {
                    this.bot.on(eName, evt.bind(null, this.bot));
                    console.log(`Successfully loaded: ${event}`);
                }
                catch (e) {
                    console.log(`You didn't export correctly at ${event}`);
                }
            }
        });
    }
    getCommand(command) {
        return this.bot.commands.get(command) || null;
    }
    getAlias(alias) {
        return this.bot.aliases.get(alias) || null;
    }
    getAllCommands() {
        return this.bot.commands.map((x) => x) || null;
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3R1cmVzL0hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLDJCQUE2QjtBQUM3QiwyQ0FBd0M7QUFDeEMsZ0RBQXdCO0FBSXhCLE1BQWEsT0FBTztJQUtoQixZQUFZLE1BQVcsRUFBRSxJQUFVLEVBQUUsTUFBYyxFQUFFLFdBQW9CO1FBQ3JFLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7UUFFcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQU0sT0FBWSxFQUFFLEVBQUU7WUFDekMsSUFBRyxDQUFDLFdBQVc7Z0JBQUUsT0FBTztZQUN4QixJQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxPQUFPO1lBRXBELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENB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