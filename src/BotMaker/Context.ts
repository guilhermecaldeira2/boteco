/* eslint-disable no-unused-vars */
import { AxiosRequestConfig } from 'axios';
import { Request } from 'express';
import { Update, Channel } from '../Context';
import MountBotMakerRequest from './MountRequest';
import api from './api';

export interface BotMakerSendMessageOptions {
  chatPlatform: 'whatsapp';
  chatChannelNumber: string;
  platformContactId: string;
}

class BotMakerContext implements Channel {
  public update: Update;

  constructor(private readonly TOKEN: string, private readonly req: Request) {
    this.update = MountBotMakerRequest(this.req);
  }

  sendMessage = async (text: string, options: BotMakerSendMessageOptions) => {
    const config: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': this.TOKEN,
      },
    };

    const data = {
      chatPlatform: options.chatPlatform,
      chatChannelNumber: options.chatChannelNumber,
      platformContactId: options.platformContactId,
      messageText: text,
    };

    return api.instance.post('/api/v1.0/message/v3', data, config);
  };
}

export default BotMakerContext;