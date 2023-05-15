import { Context } from '../Context';
import { Middleware, MiddlewareFn, MiddlewareObj } from '../Middleware';
declare type MaybeArray<T> = T | Array<T>;
declare type TriggerFn<C extends Context> = (value: string, ctx: C) => RegExpExecArray | null;
declare type Triggers<C extends Context> = MaybeArray<string | RegExp | TriggerFn<C>>;
declare type MatchedContext<C extends Context> = C;
declare type MatchedMiddleware<C extends Context> = ReadonlyArray<MiddlewareFn<MatchedContext<C & {
    match: RegExpExecArray;
}>>>;
export declare class Composer<C extends Context> implements MiddlewareObj<C> {
    handler: MiddlewareFn<C>;
    constructor(...middlewares: ReadonlyArray<Middleware<C>>);
    middleware(): MiddlewareFn<C>;
    /**
     * Subscribe middleware to handle text messages;
     * @param triggers triggers accepts one or more parameters of: regex, function or string;
     * @param middlewares middlewares accepts one or more middlewares for handle text messages;
     */
    hears(triggers: Triggers<C>, ...middlewares: MatchedMiddleware<C>): this;
    /**
     * Register middleware.
     */
    use(...middlewares: ReadonlyArray<MiddlewareFn<C>>): this;
    static escapeRegExp(s: string): string;
    static match<C extends Context>(triggers: Array<TriggerFn<C> | ((value?: string) => RegExpExecArray)>, ...middlewares: MatchedMiddleware<C>): MiddlewareFn<C>;
    static normalizeTriggers<C extends Context>(triggers: Triggers<C>): (TriggerFn<C> | ((value?: string) => RegExpExecArray))[];
    static hears<C extends Context>(triggers: Triggers<C>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static unwrap<C extends Context>(handler: Middleware<C>): MiddlewareFn<C>;
    static passThru(): MiddlewareFn<Context>;
    static compose<C extends Context>(middlewares: ReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
}
export default Composer;
