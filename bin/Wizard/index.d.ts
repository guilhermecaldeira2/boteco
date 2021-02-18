import Base from '@src/Base';
import Context from '../Context';
import { Middleware, MiddlewareObj } from '../Middleware';
import SceneContext from '../Stage/context';
import WizardContextWizard, { WizardSessionData } from './context';
export declare class Wizard<C extends Context & {
    scene: SceneContext<C, WizardSessionData>;
    wizard: WizardContextWizard<C>;
}> extends Base<C> implements MiddlewareObj<C> {
    steps: Array<Middleware<C>>;
    /**
     * Create a wizard that handle execution steps
     * @param id id must be a unique string;
     * @param steps steps must be one or more middleware or composers middlewares;
     */
    constructor(id: string, ...steps: Array<Middleware<C>>);
    middleware(): import("../Middleware").MiddlewareFn<C>;
}
export default Wizard;
