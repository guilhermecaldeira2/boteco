import Context from '@src/Context';
export declare type MiddlewareFn<C extends Context> = (ctx: C, next: () => Promise<void>) => Promise<unknown> | void;
export interface MiddlewareObj<C extends Context> {
    middleware: () => MiddlewareFn<C>;
}
export declare type Middleware<C extends Context> = MiddlewareFn<C> | MiddlewareObj<C>;
