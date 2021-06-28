"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Stage = void 0;

var _Composer = _interopRequireDefault(require("../Composer"));

var _context = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */

/* eslint-disable no-use-before-define */
class Stage extends _Composer.default {
  /**
   * Create a stage with wizards subscribed;
   * @param scenes must be an array of Wizards;
   */
  constructor(scenes = []) {
    super();
    this.scenes = new Map();
    scenes.forEach(scene => this.register(scene));
  }

  register(...scenes) {
    scenes.forEach(scene => {
      if (!scene?.id || typeof scene.middleware !== 'function') {
        throw new Error('Unsupported scene');
      }

      this.scenes.set(scene.id, scene);
    });
  }

  middleware() {
    return _Composer.default.compose([(ctx, next) => {
      const scenes = this.scenes;
      ctx.scene = new _context.default(ctx, scenes);
      return _Composer.default.unwrap(ctx.scene.current ?? _Composer.default.passThru())(ctx, next);
    }]);
  }

}

exports.Stage = Stage;
var _default = Stage;
exports.default = _default;