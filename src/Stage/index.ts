/* eslint-disable no-use-before-define */
import Base from '../Base';
import { Composer } from '../Composer';
import { SessionContext } from '../Session';
import SceneContext, { SceneSession, SceneSessionData } from './context';

// eslint-disable-next-line import/prefer-default-export
export class Stage<
  C extends SessionContext<SceneSession<D>> & {
    scene: SceneContext<C, D>;
  },
  D extends SceneSessionData = SceneSessionData
> extends Composer<C> {
  scenes: Map<string, Base<C>>;

  /**
   * Create a stage with wizards subscribed;
   * @param scenes must be an array of Wizards;
   */
  constructor(scenes: ReadonlyArray<Base<C>> = []) {
    super();
    this.scenes = new Map<string, Base<C>>();
    scenes.forEach((scene) => this.register(scene));
  }

  register(...scenes: ReadonlyArray<Base<C>>) {
    scenes.forEach((scene) => {
      if (!scene?.id || typeof scene.middleware !== 'function') {
        throw new Error('Unsupported scene');
      }
      this.scenes.set(scene.id, scene);
    });
  }

  middleware() {
    return Composer.compose<C>([
      (ctx, next) => {
        ctx.scene = new SceneContext<C, D>(ctx, this.scenes);
        return Composer.unwrap(ctx.scene.current || Composer.passThru())(ctx, next);
      },
    ]);
  }
}
