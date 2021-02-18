/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

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
      },
    };
  }

  get _id() {
    if (!('_id' in this.channel.update)) return null;
    return this.channel.update._id;
  }

  sendMessage = async (chatId: string, text: string) => {
    return this.channel.sendMessage(chatId, text);
  };
}

export default Context;
