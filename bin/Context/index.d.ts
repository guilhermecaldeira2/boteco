import { AxiosResponse } from 'axios';
export interface Channel {
    update: Update;
    sendMessage: (text: string, options: Object) => Promise<AxiosResponse>;
}
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
export declare class Context {
    readonly channel: Channel;
    constructor(channel: Channel);
    get location(): {
        latitude: string;
        longitude: string;
    };
    get image(): string;
    get hasAttachment(): boolean;
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
    sendMessage: (chatId: string, text: string) => Promise<AxiosResponse<any>>;
}
export default Context;
