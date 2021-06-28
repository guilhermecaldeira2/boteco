/* eslint-disable no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { SessionContext } from '@src/Session';
import Base from '@src/Base';
import Composer from '../Composer';

export interface SceneSessionData {
  current?: string;
}

export interface SceneSession<S extends SceneSessionData = SceneSessionData> {
  __scenes: S;
}

const noop = () => Promise.resolve();

class SceneContext<
  C extends SessionContext<SceneSession<D>>,
  D extends SceneSessionData = SceneSessionData
> {
  constructor(private readonly ctx: C, private readonly scenes: Map<string, Base<C>>) {}

  get session(): D {
    const session = this.ctx.session?.__scenes ?? ({} as D);
    if (!this.ctx.session) {
      this.ctx.session = { __scenes: session };
    } else {
      this.ctx.session.__scenes = session;
    }
    return session;
  }

  get current() {
    const sceneId = this.session.current;
    return !sceneId || !this.scenes.has(sceneId) ? undefined : this.scenes.get(sceneId);
  }

  reset() {
    if (this.ctx.session !== undefined) this.ctx.session.__scenes = {} as D;
  }

  async enter(sceneId: string) {
    if (!this.scenes.has(sceneId)) {
      throw new Error(`Can't find scene: ${sceneId}`);
    }

    this.session.current = sceneId;
    const handler = 'middleware' in this.current ? this.current.middleware() : null;
    if (!handler) throw new Error(`Can't find scene ${sceneId}`);
    return handler(this.ctx, noop);
  }

  private leaving = false;

  async leave() {
    if (this.leaving) return;
    try {
      this.leaving = true;
      if (!this.current) return;

      const handler = Composer.passThru();
      await handler(this.ctx, noop);
      this.reset();
    } finally {
      this.leaving = false;
    }
  }
}

export default SceneContext;
