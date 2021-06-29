/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
import Base from '@src/Base';
import Composer from '@src/Composer';
import { SessionContext } from '@src/Session';
import SceneContext, { SceneSession, SceneSessionData } from './context';

export type MaybePromise<T> = T | Promise<T>;

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
        const scenes: Map<string, Base<C>> = this.scenes;
        ctx.scene = new SceneContext<C, D>(ctx, scenes);
        return Composer.unwrap(ctx.scene.current ?? Composer.passThru())(ctx, next);
      },
    ]);
  }
}

export default Stage;
