import { Request } from 'express';
import { Update, Channel, SendMessageOptions } from '../Context';
export declare class BotMakerChannel implements Channel {
    private readonly TOKEN;
    private readonly req;
    update: Update;
    constructor(TOKEN: string, req: Request);
    sendMessage: (text: string, options: SendMessageOptions) => Promise<import("axios").AxiosResponse<any>>;
    sendImage: (photoUrl: string, options: SendMessageOptions) => Promise<import("axios").AxiosResponse<any>>;
    static sendMessage: (text: string, TOKEN: string, options: SendMessageOptions) => Promise<import("axios").AxiosResponse<any>>;
    static sendImage: (photoUrl: string, TOKEN: string, options: SendMessageOptions) => Promise<import("axios").AxiosResponse<any>>;
}
export default BotMakerChannel;
