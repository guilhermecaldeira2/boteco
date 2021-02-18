"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MountRequest = _interopRequireDefault(require("./MountRequest"));

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
class BotMakerContext {
  constructor(TOKEN, req) {
    this.TOKEN = TOKEN;
    this.req = req;
    this.update = (0, _MountRequest.default)(this.req);
  }

  sendMessage = async (text, options) => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': this.TOKEN
      }
    };
    const data = {
      chatPlatform: options.chatPlatform,
      chatChannelNumber: options.chatChannelNumber,
      platformContactId: options.platformContactId,
      messageText: text
    };
    return _api.default.instance.post('/api/v1.0/message/v3', data, config);
  };
}

var _default = BotMakerContext;
exports.default = _default;