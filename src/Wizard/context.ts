import SceneContext, { SceneSession, SceneSessionData } from '../Stage/context';
import { SessionContext } from '../Session';
import { Middleware } from '../Middleware';

export interface WizardSessionData extends SceneSessionData {
  cursor: number;
}

export interface WizardSession<S extends WizardSessionData = WizardSessionData>
  extends SceneSession<S> {}

export default class WizardContextWizard<
  C extends SessionContext<WizardSession> & {
    scene: SceneContext<C, WizardSessionData>;
  },
> {
  private ctx: C;

  private steps: ReadonlyArray<Middleware<C>>;

  constructor(ctx: C, steps: ReadonlyArray<Middleware<C>>) {
    this.steps = steps;
    this.ctx = ctx;
    this.cursor = ctx.scene.session.cursor ?? 0;
  }

  get step() {
    return this.steps[this.cursor];
  }

  get cursor() {
    return this.ctx.scene.session.cursor;
  }

  set cursor(cursor: number) {
    this.ctx.scene.session.cursor = cursor;
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
