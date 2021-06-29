import { Request } from 'express';
import { Update } from '@src/Context';

function MountBotMakerRequest(req: Request): Update {
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
    WHATSAPP_NUMBER,
  } = req.body;

  return {
    _id: _id_,
    from: {
      platform: chatPlatform,
      userAgent: req.headers['user-agent'],
      user: {
        id: customerId,
        name: fromName,
        telephoneNumber: contactId,
      },
    },
    me: {
      telephoneNumber: WHATSAPP_NUMBER,
    },
    hasAttachment,
    image,
    location,
    message,
  };
}

export default MountBotMakerRequest;
