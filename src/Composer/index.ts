/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import Context from '@src/Context';
import { Middleware, MiddlewareObj, MiddlewareFn } from '@src/Middleware';

type MaybeArray<T> = T | T[];

type TriggerFn<C extends Context> = (value: string, ctx: C) => RegExpExecArray | null;

type Triggers<C extends Context> = MaybeArray<string | RegExp | TriggerFn<C>>;

type MatchedContext<C extends Context> = C;

type MatchedMiddleware<C extends Context> = ReadonlyArray<
  Middleware<MatchedContext<C & { match: RegExpExecArray }>>
>;

export class Composer<C extends Context> implements MiddlewareObj<C> {
  handler: MiddlewareFn<C>;

  constructor(...middlewares: ReadonlyArray<Middleware<C>>) {
    this.handler = Composer.compose(middlewares);
  }

  /**
   * Subscribe middleware to handle text messages;
   * @param triggers triggers accepts one or more parameters of: regex, function or string;
   * @param middlewares middlewares accepts one or more middlewares for handle text messages;
   */
  hears(triggers: Triggers<C>, ...middlewares: MatchedMiddleware<C>) {
    return this.use(Composer.hears(triggers, ...middlewares));
  }

  /**
   * Register middleware.
   */
  use(...fns: ReadonlyArray<Middleware<C>>) {
    this.handler = Composer.compose([this.handler, ...fns]);
    return this;
  }

  /**
   * Returns a middleware handler
   */
  middleware() {
    return this.handler;
  }

  static hears<C extends Context>(triggers: Triggers<C>, ...fns: MatchedMiddleware<C>) {
    return Composer.match(Composer.normalizeTriggers(triggers), ...fns);
  }

  static escapeRegExp(s: string) {
    return s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
  }

  static normalizeTriggers<C extends Context>(triggers: Triggers<C>) {
    if (!Array.isArray(triggers)) triggers = [triggers];
    return triggers.map((t) => {
      if (!t) throw new Error('Invalid trigger');
      if (typeof t === 'function') return t;
      if (t instanceof RegExp) {
        return (value = '') => {
          t.lastIndex = 0;
          return t.exec(value);
        };
      }
      const regex = new RegExp(`^${Composer.escapeRegExp(t)}$`);
      return (value: string) => regex.exec(value);
    });
  }

  static match<C extends Context>(
    triggers: (TriggerFn<C> | ((value?: string) => RegExpExecArray))[],
    ...middlewares: MatchedMiddleware<C>
  ): MiddlewareFn<C> {
    return async (ctx, next) => {
      const handler = Composer.compose(middlewares);
      const text = ctx.message;
      if (!text) return next();
      let matchedTrigger = false;
      let i = 0;
      while (i < triggers.length && !matchedTrigger) {
        const t = triggers[i];
        const m = t(text, ctx);
        if (m) {
          matchedTrigger = true;
          return handler(Object.assign(ctx, { match: m }), next);
        }
        i += 1;
      }
      return next();
    };
  }

  static unwrap<C extends Context>(handler: Middleware<C>) {
    if (!handler) {
      throw new Error('Handler is undefined');
    }
    return 'middleware' in handler ? handler.middleware() : handler;
  }

  static passThru(): MiddlewareFn<Context> {
    return (ctx, next) => next();
  }

  static compose<C extends Context>(middlewares: ReadonlyArray<Middleware<C>>): MiddlewareFn<C> {
    if (!Array.isArray(middlewares)) {
      throw new Error('Middlewares must be an array');
    }

    if (middlewares.length === 0) return Composer.passThru();

    if (middlewares.length === 1) return Composer.unwrap(middlewares[0]!);

    return (ctx, next) => {
      let prevIndex = -1;

      return execute(0, ctx);

      async function execute(i: number, context: C): Promise<void> {
        if (i <= prevIndex) {
          throw new Error('next() called multiple times');
        }

        prevIndex = i;

        const middleware = Composer.unwrap(middlewares[i] ?? next);

        await middleware(context, async (ctx = context) => {
          await execute(i + 1, ctx);
        });
      }
    };
  }
}

export default Composer;
