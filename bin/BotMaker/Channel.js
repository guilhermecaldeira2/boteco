"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BotMakerChannel = void 0;

var _MountRequest = _interopRequireDefault(require("./MountRequest"));

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BotMakerChannel {
  constructor(TOKEN, req) {
    _defineProperty(this, "sendMessage", async (text, options) => {
      return BotMakerChannel.sendMessage(text, this.TOKEN, options);
    });

    _defineProperty(this, "sendImage", async (photoUrl, options) => {
      return BotMakerChannel.sendImage(photoUrl, this.TOKEN, options);
    });

    this.TOKEN = TOKEN;
    this.req = req;
    this.update = (0, _MountRequest.default)(this.req);
  }

}

exports.BotMakerChannel = BotMakerChannel;

_defineProperty(BotMakerChannel, "sendMessage", async (text, TOKEN, options) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': TOKEN
    }
  };
  const data = {
    chatPlatform: options.chatPlatform,
    chatChannelNumber: options.chatChannelNumber,
    platformContactId: options.platformContactId,
    messageText: text
  };
  return _api.default.post('/api/v1.0/message/v3', data, config);
});

_defineProperty(BotMakerChannel, "sendImage", async (photoUrl, TOKEN, options) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': TOKEN
    }
  };
  const data = {
    chatPlatform: options.chatPlatform,
    chatChannelNumber: options.chatChannelNumber,
    platformContactId: options.platformContactId,
    imageURL: photoUrl
  };
  return _api.default.post('/api/v1.0/message/v3', data, config);
});

var _default = BotMakerChannel;
exports.default = _default;