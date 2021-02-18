import { Request } from 'express';
import { Update, Channel } from '../Context';
export interface BotMakerSendMessageOptions {
    chatPlatform: 'whatsapp';
    chatChannelNumber: string;
    platformContactId: string;
}
declare class BotMakerContext implements Channel {
    private readonly TOKEN;
    private readonly req;
    update: Update;
    constructor(TOKEN: string, req: Request);
    sendMessage: (text: string, options: BotMakerSendMessageOptions) => Promise<import("axios").AxiosResponse<any>>;
}
export default BotMakerContext;
