import { Router } from 'express';
import { ServerConfiguration } from './Server';
import { Composer } from './Composer';
import { Context } from './Context';
interface BotecoConfiguration extends ServerConfiguration {
    contextType: 'botmaker';
    TOKEN: string;
}
export default class Boteco<C extends Context = Context> extends Composer<C> {
    private botecoConfiguration;
    private serverConfiguration;
    private express;
    constructor(configuration: BotecoConfiguration);
    webhookHandler: () => import("express-serve-static-core").Router;
    launch(router?: Router): void;
}
export { Context } from './Context';
export { Wizard } from './Wizard';
export { Stage } from './Stage';
export { Composer } from './Composer';
export { Session } from './Session';
