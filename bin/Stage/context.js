"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Composer = require("../Composer");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const noop = () => Promise.resolve();

class SceneContext {
  constructor(ctx, scenes) {
    _defineProperty(this, "leaving", false);

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
    this.session.cursor = 0;
    const handler = 'middleware' in this.current ? this.current.middleware() : null;
    if (!handler) throw new Error(`Can't find scene ${sceneId}`); // eslint-disable-next-line no-return-await

    return await handler(this.ctx, noop);
  }

  async leave() {
    if (this.leaving) return;

    try {
      this.leaving = true;
      if (!this.current) return;

      const handler = _Composer.Composer.passThru();

      await handler(this.ctx, noop);
      this.reset();
    } finally {
      this.leaving = false;
    }
  }

}

exports.default = SceneContext;