import Base from '@src/Base';
import Composer from '../Composer';
import Context from '../Context';
import { Middleware, MiddlewareObj } from '../Middleware';
import SceneContext from '../Stage/context';
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
