import { BaseClientEvents, BitFieldResolvable, Client, ClientEvents, ConstantsEvents, Message, PermissionResolvable } from "discord.js";



export type RunFunction = () => any;
export type EventsFlag = Record<EventsString, bigint>;

export type EventsOverwriteOptions = Partial<Record<EventsString, boolean | null>>;

export type EventsResolvable = BitFieldResolvable<EventsString, bigint>;

export type EventsString =
  | 'applicationCommandCreate'
  /** @deprecated See [this issue](https://github.com/discord/discord-api-docs/issues/3690) for more information. */
  | 'applicationCommandDelete'
  /** @deprecated See [this issue](https://github.com/discord/discord-api-docs/issues/3690) for more information. */
  | 'applicationCommandUpdate'
  | 'cacheSweep'
  | 'channelCreate'
  | 'channelDelete'
  | 'channelPinsUpdate'
  | 'channelUpdate'
  | 'warn'
  | 'emojiCreate'
  | 'emojiDelete'
  | 'emojiUpdate'
  | 'error'
  | 'guildBanAdd'
  | 'guildBanRemove'
  | 'guildCreate'
  | 'guildDelete'
  | 'guildUnavailable'
  | 'guildIntegrationsUpdate'
  | 'guildMemberAdd'
  | 'guildMemberAvailable'
  | 'guildMemberRemove'
  | 'guildMembersChunk'
  | 'guildMemberUpdate'
  | 'guildUpdate'
  | 'inviteCreate'
  | 'inviteDelete'
  /** @deprecated Use messageCreate instead */
  | 'message'
  | 'messageCreate'
  | 'messageDelete'
  | 'messageReactionRemoveAll'
  | 'messageReactionRemoveEmoji'
  | 'messageDeleteBulk'
  | 'messageReactionAdd'
  | 'messageReactionRemove'
  | 'messageUpdate'
  | 'presenceUpdate'
  | 'ready'
  | 'invalidated'
  | 'roleCreate'
  | 'roleDelete'
  | 'roleUpdate'
  | 'threadCreate'
  | 'threadDelete'
  | 'threadListSync'
  | 'threadMemberUpdate'
  | 'threadMembersUpdate'
  | 'threadUpdate'
  |'typingStart'
  | 'userUpdate'
  | 'voiceStateUpdate'
  | 'webhookUpdate'
  /** @deprecated Use interactionCreate instead */
  | 'interaction'
  | 'interactionCreate'
  | 'shardDisconnect'
  | 'shardError'
  | 'shardReady'
  | 'shardReconnecting'
  | 'shardResume'
  | 'stageInstanceCreate'
  | 'stageInstanceUpdate'
  | 'stageInstanceDelete'
  | 'stickerCreate'
  | 'stickerDelete'
  | 'stickerUpdate'
  | 'guildScheduledEventCreate'
  | 'guildScheduledEventUpdate'
  | 'guildScheduledEventDelete'
  | 'guildScheduledEventUserAdd'
  | 'guildScheduledEventUserRemove'

export type EventOptions = {
    event: EventsResolvable,
    run: RunFunction
};

export class Event {
    constructor(eventOptions: EventOptions) {
        Object.assign(this, eventOptions);
    }
};