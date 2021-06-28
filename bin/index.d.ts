import { Router } from 'express';
import Composer from './Composer';
import Context from './Context';
export interface BotecoOptions {
    webhook?: {
        port?: string;
        webhook?: string;
    };
    contextType: 'botmaker';
    TOKEN: string;
}
export declare class Boteco<C extends Context = Context> extends Composer<C> {
    private readonly options;
    private server;
    private port;
    private webhook;
    /**
     * @param options pass context type for change webhook host, need token for connection;
     */
    constructor(options: BotecoOptions);
    webhookHandler(): import("express-serve-static-core").Router;
    /**
     * Starts polling hook
     */
    launch(router?: Router): void;
}
export default Boteco;
