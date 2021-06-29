import Base from '@src/Base';
import Composer from '@src/Composer';
import Context from '@src/Context';
import { Middleware, MiddlewareObj } from '@src/Middleware';
import SceneContext from '@src/Stage/context';
import WizardContextWizard, { WizardSessionData } from './context';

export class Wizard<
    C extends Context & {
      scene: SceneContext<C, WizardSessionData>;
      wizard: WizardContextWizard<C>;
    }
  >
  extends Base<C>
  implements MiddlewareObj<C> {
  steps: Array<Middleware<C>>;

  /**
   * Create a wizard that handle execution steps
   * @param id id must be a unique string;
   * @param steps steps must be one or more middleware or composers middlewares;
   */
  constructor(id: string, ...steps: Array<Middleware<C>>) {
    super(id, ...steps);
    this.steps = steps;
  }

  middleware() {
    return Composer.compose<C>([
      (ctx, next) => {
        ctx.wizard = new WizardContextWizard(ctx, this.steps);
        if (!ctx.wizard.step) {
          ctx.wizard.selectStep(0);
          return ctx.scene.leave();
        }
        return Composer.unwrap(ctx.wizard.step)(ctx, next);
      },
    ]);
  }
}

export default Wizard;
