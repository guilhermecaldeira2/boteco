/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

import { AxiosResponse } from 'axios';

type Photo = string | Buffer;

export interface Channel {
  update: Update;
  sendMessage: (text: string, options: SendMessageOptions) => Promise<AxiosResponse>;
  sendImage: (photo: Photo, options: SendMessageOptions) => Promise<AxiosResponse>;
}

export interface SendMessageOptions {
  chatPlatform: 'whatsapp';
  chatChannelNumber: string;
  platformContactId: string;
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

export class Context {
  constructor(readonly channel: Channel) {}

  get location() {
    return {
      latitude: this.channel.update.location.latitude,
      longitude: this.channel.update.location.longitude,
    };
  }

  get image() {
    if (!('image' in this.channel.update)) return null;
    return this.channel.update.image;
  }

  get hasAttachment() {
    if (!('hasAttachment' in this.channel.update)) return null;
    return this.channel.update.hasAttachment ?? null;
  }

  get message() {
    if (!('message' in this.channel.update)) return null;
    return this.channel.update.message ?? null;
  }

  get from() {
    return {
      userAgent: this.channel.update.from.userAgent,
      platform: this.channel.update.from.platform,
      user: {
        id: this.channel.update.from.user.id,
        name: this.channel.update.from.user.name,
        telephoneNumber: this.channel.update.from.user.telephoneNumber,
      },
    };
  }

  get me() {
    return {
      telephoneNumber: this.channel.update.me.telephoneNumber,
    };
  }

  get _id() {
    if (!('_id' in this.channel.update)) return null;
    return this.channel.update._id;
  }

  sendMessage = async (text: string, options: SendMessageOptions) => {
    return this.channel.sendMessage(text, options);
  };

  sendPhoto = async (photo: Photo, options: SendMessageOptions) => {
    return this.channel.sendImage(photo, options);
  };
}

export default Context;
