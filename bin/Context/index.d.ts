/// <reference types="node" />
import { AxiosResponse } from 'axios';
export interface Update {
    _id: string;
    from: {
        userAgent: string;
        platform: string;
        user: {
            id: string;
            name: string;
            telephoneNumber: string;
        };
    };
    me: {
        telephoneNumber: string;
    };
    message?: string;
    hasAttachment?: boolean;
    image?: string;
    location?: {
        latitude: string;
        longitude: string;
    };
}
declare type Photo = string | Buffer;
export interface SendMessageOptions {
    chatPlatform: 'whatsapp';
    chatChannelNumber: string;
    platformContactId: string;
}
export interface Channel {
    update: Update;
    sendMessage: (text: string, options: SendMessageOptions) => Promise<AxiosResponse>;
    sendImage: (photo: Photo, options: SendMessageOptions) => Promise<AxiosResponse>;
}
export declare class Context {
    readonly channel: Channel;
    constructor(channel: Channel);
    get location(): {
        latitude: string;
        longitude: string;
    };
    get image(): string;
    get hasAttachment(): true;
    get message(): string;
    get from(): {
        userAgent: string;
        platform: string;
        user: {
            id: string;
            name: string;
            telephoneNumber: string;
        };
    };
    get me(): {
        telephoneNumber: string;
    };
    get _id(): string;
    sendMessage: (text: string, options: SendMessageOptions) => Promise<AxiosResponse<any>>;
    sendPhoto: (photo: Photo, options: SendMessageOptions) => Promise<AxiosResponse<any>>;
}
export {};
