import SceneContext, { SceneSession, SceneSessionData } from '../Stage/context';
import { SessionContext } from '../Session';
import { Middleware } from '../Middleware';
export interface WizardSessionData extends SceneSessionData {
    cursor: number;
}
export interface WizardSession<S extends WizardSessionData = WizardSessionData> extends SceneSession<S> {
}
declare class WizardContextWizard<C extends SessionContext<WizardSession> & {
    scene: SceneContext<C, WizardSessionData>;
}> {
    private readonly ctx;
    private readonly steps;
    constructor(ctx: C, steps: ReadonlyArray<Middleware<C>>);
    get step(): Middleware<C>;
    get cursor(): number;
    set cursor(cursor: number);
    selectStep(index: number): this;
    next(): this;
    back(): this;
}
export default WizardContextWizard;
