"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Composer = void 0;

/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/prefer-default-export
class Composer {
  constructor(...middlewares) {
    this.handler = Composer.compose(middlewares);
  }

  middleware() {
    return this.handler;
  }
  /**
   * Subscribe middleware to handle text messages;
   * @param triggers triggers accepts one or more parameters of: regex, function or string;
   * @param middlewares middlewares accepts one or more middlewares for handle text messages;
   */


  hears(triggers, ...middlewares) {
    return this.use(Composer.hears(triggers, ...middlewares));
  }
  /**
   * Register middleware.
   */


  use(...middlewares) {
    this.handler = Composer.compose([this.handler, ...middlewares]);
    return this;
  }

  static escapeRegExp(s) {
    return s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
  }

  static match( // eslint-disable-next-line no-unused-vars
  triggers, ...middlewares) {
    return (ctx, next) => {
      const handler = Composer.compose(middlewares);
      const text = ctx.message;
      if (text === undefined) return next(); // eslint-disable-next-line no-restricted-syntax

      for (const trigger of triggers) {
        const match = trigger(text, ctx);

        if (match) {
          return handler(Object.assign(ctx, {
            match
          }), next);
        }
      }

      return next();
    };
  }

  static normalizeTriggers(triggers) {
    let trs = triggers;
    if (!Array.isArray(trs)) trs = [trs];
    return trs.map(t => {
      if (!t) throw new Error('Invalid trigger');
      if (typeof t === 'function') return t;

      if (t instanceof RegExp) {
        return (value = '') => {
          // eslint-disable-next-line no-param-reassign
          t.lastIndex = 0;
          return t.exec(value);
        };
      }

      const regex = new RegExp(`^${Composer.escapeRegExp(t)}$`);
      return value => regex.exec(value);
    });
  }

  static hears(triggers, ...fns) {
    return Composer.match(Composer.normalizeTriggers(triggers), ...fns);
  }

  static unwrap(handler) {
    if (!handler) {
      throw new Error('Handler is undefined');
    }

    return 'middleware' in handler ? handler.middleware() : handler;
  }

  static passThru() {
    return (ctx, next) => next();
  }

  static compose(middlewares) {
    if (!Array.isArray(middlewares)) {
      throw new Error('Middlewares must be an array');
    }

    if (middlewares.length === 0) return Composer.passThru();
    if (middlewares.length === 1) return Composer.unwrap(middlewares[0]);
    return (ctx, next) => {
      let prevIndex = -1;

      async function execute(i, context) {
        if (i <= prevIndex) {
          throw new Error('next() called multiple times');
        }

        prevIndex = i;
        const middleware = Composer.unwrap(middlewares[i] || next);
        await middleware(context, async (contx = context) => {
          await execute(i + 1, contx);
        });
      }

      return execute(0, ctx);
    };
  }

}

exports.Composer = Composer;