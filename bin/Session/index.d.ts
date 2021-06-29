import Context from '@src/Context';
import { MiddlewareFn } from '@src/Middleware';
export interface SessionContext<S extends Object> extends Context {
    session?: S;
}
export declare function Session<S extends Object>(): MiddlewareFn<SessionContext<S>>;
export default Session;
