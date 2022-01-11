// https://github.com/reconlx/djs-typescript-handler/blob/master/src/typings/Command.ts
import {
    BaseApplicationCommandData,
    Client,
    Message,
    PermissionResolvable
} from "discord.js";
/**
 * {
 *  name: "commandname",
 * description: "any description",
 * run: async({ message }) => {
 *
 * }
 * }
 */
interface RunOptions {
    client: Client;
    message: Message;
    args: String[];
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    name: String;
    aliases: String[];
    description: String,
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
}

export class Command {
    constructor(eventOptions: CommandType) {
        Object.assign(this, eventOptions);
    }
};