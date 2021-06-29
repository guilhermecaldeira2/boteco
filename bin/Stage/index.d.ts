import Base from '@src/Base';
import Composer from '@src/Composer';
import { SessionContext } from '@src/Session';
import SceneContext, { SceneSession, SceneSessionData } from './context';
export declare type MaybePromise<T> = T | Promise<T>;
export declare class Stage<C extends SessionContext<SceneSession<D>> & {
    scene: SceneContext<C, D>;
}, D extends SceneSessionData = SceneSessionData> extends Composer<C> {
    scenes: Map<string, Base<C>>;
    /**
     * Create a stage with wizards subscribed;
     * @param scenes must be an array of Wizards;
     */
    constructor(scenes?: ReadonlyArray<Base<C>>);
    register(...scenes: ReadonlyArray<Base<C>>): void;
    middleware(): import("../Middleware").MiddlewareFn<C>;
}
export default Stage;
