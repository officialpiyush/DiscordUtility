/// <reference types="node" />
import { Message } from "discord.js";
import { Options } from "../interfaces/options";
import { EventEmitter } from "events";
export declare class AntiSpam extends EventEmitter {
    cache: object[];
    options: Options;
    constructor(options: Options);
    checkSpam(message: Message): void;
    warn: (message: any) => void;
    ban: (message: any) => void;
    kick: (message: any) => void;
    clearCache: () => void;
}
