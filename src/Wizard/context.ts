/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable constructor-super */
import Context from '@src/Context';
import SceneContext, { SceneSession, SceneSessionData } from '../Stage/context';
import { SessionContext } from '../Session';
import { Middleware } from '../Middleware';

// export interface WizardContext<D extends WizardSessionData = WizardSessionData> extends Context {
//   session: WizardSession<D>;
//   scene: SceneContext<WizardContext<D>, D>;
//   wizard: WizardContextWizard<WizardContext<D>>;
// }

export interface WizardSessionData extends SceneSessionData {
  cursor: number;
}

export interface WizardSession<S extends WizardSessionData = WizardSessionData>
  extends SceneSession<S> {}

class WizardContextWizard<
  C extends SessionContext<WizardSession> & {
    scene: SceneContext<C, WizardSessionData>;
  }
> {
  constructor(private readonly ctx: C, private readonly steps: ReadonlyArray<Middleware<C>>) {
    this.cursor = ctx.scene.session.cursor || 0;
  }

  get step() {
    return this.steps[this.cursor];
  }

  get cursor() {
    return this.ctx.scene.session.cursor;
  }

  set cursor(cursor: number) {
    this.ctx.scene.session.cursor = cursor;
    console.log('T O D D Y N H O');
  }

  selectStep(index: number) {
    this.cursor = index;
    return this;
  }

  next() {
    return this.selectStep(this.cursor + 1);
  }

  back() {
    return this.selectStep(this.cursor - 1);
  }
}

export default WizardContextWizard;
