/* eslint-disable no-unused-vars */
import { Context } from '../Context';

export type MiddlewareFn<C extends Context> = (
  ctx: C,
  next: () => Promise<void>,
) => Promise<void> | void;

export interface MiddlewareObj<C extends Context> {
  middleware: () => MiddlewareFn<C>;
}

export type Middleware<C extends Context> = MiddlewareFn<C> | MiddlewareObj<C>;
