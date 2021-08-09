/* eslint-disable no-shadow */
import { Context } from '../Context';
import { Middleware, MiddlewareFn, MiddlewareObj } from '../Middleware';

type MaybeArray<T> = T | Array<T>;

// eslint-disable-next-line no-unused-vars
type TriggerFn<C extends Context> = (value: string, ctx: C) => RegExpExecArray | null;

type Triggers<C extends Context> = MaybeArray<string | RegExp | TriggerFn<C>>;

type MatchedContext<C extends Context> = C;

type MatchedMiddleware<C extends Context> = ReadonlyArray<
  MiddlewareFn<MatchedContext<C & { match: RegExpExecArray }>>
>;

// eslint-disable-next-line import/prefer-default-export
export class Composer<C extends Context> implements MiddlewareObj<C> {
  handler: MiddlewareFn<C>;

  constructor(...middlewares: ReadonlyArray<Middleware<C>>) {
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
  hears(triggers: Triggers<C>, ...middlewares: MatchedMiddleware<C>) {
    return this.use(Composer.hears(triggers, ...middlewares));
  }

  /**
   * Register middleware.
   */
  use(...middlewares: ReadonlyArray<MiddlewareFn<C>>) {
    this.handler = Composer.compose([this.handler, ...middlewares]);
    return this;
  }

  static escapeRegExp(s: string) {
    return s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
  }

  static match<C extends Context>(
    // eslint-disable-next-line no-unused-vars
    triggers: Array<TriggerFn<C> | ((value?: string) => RegExpExecArray)>,
    ...middlewares: MatchedMiddleware<C>
  ): MiddlewareFn<C> {
    return (ctx, next) => {
      const handler = Composer.compose(middlewares);
      const text = ctx.message;
      if (text === undefined) return next();
      // eslint-disable-next-line no-restricted-syntax
      for (const trigger of triggers) {
        const match = trigger(text, ctx);
        if (match) {
          return handler(Object.assign(ctx, { match }), next);
        }
      }
      return next();
    };
  }

  static normalizeTriggers<C extends Context>(triggers: Triggers<C>) {
    let trs = triggers;
    if (!Array.isArray(trs)) trs = [trs];
    return trs.map((t) => {
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
      return (value: string) => regex.exec(value);
    });
  }

  static hears<C extends Context>(triggers: Triggers<C>, ...fns: MatchedMiddleware<C>) {
    return Composer.match(Composer.normalizeTriggers(triggers), ...fns);
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

      async function execute(i: number, context: C) {
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
