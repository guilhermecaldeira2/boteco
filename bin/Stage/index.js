"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Stage = void 0;

var _Composer = require("../Composer");

var _context = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/prefer-default-export
class Stage extends _Composer.Composer {
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
    return _Composer.Composer.compose([(ctx, next) => {
      ctx.scene = new _context.default(ctx, this.scenes);
      return _Composer.Composer.unwrap(ctx.scene.current || _Composer.Composer.passThru())(ctx, next);
    }]);
  }

}

exports.Stage = Stage;
var _default = Stage;
exports.default = _default;