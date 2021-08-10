import { Context } from '../Context';
export declare type MiddlewareFn<C extends Context> = (ctx: C, next: () => Promise<void>) => Promise<void> | void;
export interface MiddlewareObj<C extends Context> {
    middleware: () => MiddlewareFn<C>;
}
export declare type Middleware<C extends Context> = MiddlewareFn<C> | MiddlewareObj<C>;
