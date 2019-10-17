export interface Options {
    warnMessage?: string;
    kickMessage?: string;
    banMessage?: string;
    messageLimit: number;
    deleteMessage: boolean;
    banUser?: boolean;
    maxInterval?: number;
    kickUser?: boolean;
    warnUser?: boolean;
    muteUser?: boolean;
    ignoreBots?: boolean;
    ignoredGuilds?: string[];
    ignoredUsers?: string[];
    ignoredRoles?: string[];
    ignoredChannels?: string[];
}