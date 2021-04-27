"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Composer = _interopRequireDefault(require("../Composer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-return-await */

/* eslint-disable no-empty-function */

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-use-before-define */

/* eslint-disable no-unused-vars */

/* eslint-disable no-useless-constructor */
const noop = () => Promise.resolve();

class SceneContext {
  constructor(ctx, scenes) {
    this.ctx = ctx;
    this.scenes = scenes;
  }

  get session() {
    var _this$ctx$session$__s, _this$ctx$session;

    const session = (_this$ctx$session$__s = (_this$ctx$session = this.ctx.session) === null || _this$ctx$session === void 0 ? void 0 : _this$ctx$session.__scenes) !== null && _this$ctx$session$__s !== void 0 ? _this$ctx$session$__s : {};

    if (!this.ctx.session) {
      this.ctx.session = {
        __scenes: session
      };
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
    if (this.ctx.session !== undefined) this.ctx.session.__scenes = {};
  }

  async enter(sceneId) {
    if (!this.scenes.has(sceneId)) {
      throw new Error(`Can't find scene: ${sceneId}`);
    }

    this.session.current = sceneId;
    const handler = 'middleware' in this.current ? this.current.middleware() : null;
    if (!handler) throw new Error(`Can't find scene ${sceneId}`);
    return await handler(this.ctx, noop);
  }

  leaving = false;

  async leave() {
    if (this.leaving) return;

    try {
      this.leaving = true;
      if (!this.current) return;

      const handler = _Composer.default.passThru();

      await handler(this.ctx, noop);
      this.reset();
    } finally {
      this.leaving = false;
    }
  }

}

var _default = SceneContext;
exports.default = _default;