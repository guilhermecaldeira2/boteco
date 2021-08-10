"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function MountBotMakerRequest(req) {
  const {
    chatPlatform,
    _id_,
    contactId,
    fromName,
    hasAttachment,
    image,
    location,
    message,
    customerId,
    WHATSAPP_NUMBER
  } = req.body;
  return {
    _id: _id_,
    from: {
      platform: chatPlatform,
      userAgent: req.headers['user-agent'],
      user: {
        id: customerId,
        name: fromName,
        telephoneNumber: contactId
      }
    },
    me: {
      telephoneNumber: WHATSAPP_NUMBER
    },
    hasAttachment,
    image,
    location,
    message
  };
}

var _default = MountBotMakerRequest;
exports.default = _default;