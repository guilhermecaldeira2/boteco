"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = void 0;

class Context {
  constructor(channel) {
    this.channel = channel;
  }

  get location() {
    return {
      latitude: this.channel.update.location.latitude,
      longitude: this.channel.update.location.longitude
    };
  }

  get image() {
    if (!('image' in this.channel.update)) return null;
    return this.channel.update.image;
  }

  get hasAttachment() {
    if (!('hasAttachment' in this.channel.update)) return null;
    return this.channel.update.hasAttachment || null;
  }

  get message() {
    if (!('message' in this.channel.update)) return null;
    return this.channel.update.message || null;
  }

  get from() {
    return {
      userAgent: this.channel.update.from.userAgent,
      platform: this.channel.update.from.platform,
      user: {
        id: this.channel.update.from.user.id,
        name: this.channel.update.from.user.name,
        telephoneNumber: this.channel.update.from.user.telephoneNumber
      }
    };
  }

  get me() {
    return {
      telephoneNumber: this.channel.update.me.telephoneNumber
    };
  } // eslint-disable-next-line no-underscore-dangle


  get _id() {
    if (!('_id' in this.channel.update)) return null; // eslint-disable-next-line no-underscore-dangle

    return this.channel.update._id;
  }

  sendMessage = async (text, options) => {
    return this.channel.sendMessage(text, options);
  };
  sendPhoto = async (photo, options) => {
    return this.channel.sendImage(photo, options);
  };
}

exports.Context = Context;