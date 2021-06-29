/* eslint-disable no-underscore-dangle */
import Cache from 'node-cache';

import Context from '@src/Context';
import { MiddlewareFn } from '@src/Middleware';

export interface SessionContext<S extends Object> extends Context {
  session?: S;
}

function getSessionKey(ctx: Context) {
  return ctx.from.user.id;
}

export function Session<S extends Object>(): MiddlewareFn<SessionContext<S>> {
  const store = new Cache({ stdTTL: 3600 });
  const sessionKey = getSessionKey;
  return async (ctx, next) => {
    const key = sessionKey(ctx);
    ctx.session = store.get(key);
    if (!ctx.session) {
      store.set(key, {});
      ctx.session = {} as S;
    }

    await next();

    if (!ctx.session) {
      store.del(key);
    } else {
      store.set(key, ctx.session);
    }
  };
}

export default Session;
