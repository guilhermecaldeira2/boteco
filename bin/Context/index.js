"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Context = void 0;

/* eslint-disable no-use-before-define */

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-empty-function */

/* eslint-disable no-unused-vars */

/* eslint-disable no-useless-constructor */
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
    var _this$channel$update$;

    if (!('hasAttachment' in this.channel.update)) return null;
    return (_this$channel$update$ = this.channel.update.hasAttachment) !== null && _this$channel$update$ !== void 0 ? _this$channel$update$ : null;
  }

  get message() {
    var _this$channel$update$2;

    if (!('message' in this.channel.update)) return null;
    return (_this$channel$update$2 = this.channel.update.message) !== null && _this$channel$update$2 !== void 0 ? _this$channel$update$2 : null;
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
  }

  get _id() {
    if (!('_id' in this.channel.update)) return null;
    return this.channel.update._id;
  }

  sendMessage = async (text, options) => {
    return this.channel.sendMessage(text, options);
  };
}

exports.Context = Context;
var _default = Context;
exports.default = _default;