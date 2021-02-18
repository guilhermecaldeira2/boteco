"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Wizard = void 0;

var _Base = _interopRequireDefault(require("../Base"));

var _Composer = _interopRequireDefault(require("../Composer"));

var _context = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Wizard extends _Base.default {
  /**
   * Create a wizard that handle execution steps
   * @param id id must be a unique string;
   * @param steps steps must be one or more middleware or composers middlewares;
   */
  constructor(id, ...steps) {
    super(id, ...steps);
    this.steps = steps;
  }

  middleware() {
    return _Composer.default.compose([(ctx, next) => {
      ctx.wizard = new _context.default(ctx, this.steps);

      if (!ctx.wizard.step) {
        ctx.wizard.selectStep(0);
        return ctx.scene.leave();
      }

      return _Composer.default.unwrap(ctx.wizard.step)(ctx, next);
    }]);
  }

}

exports.Wizard = Wizard;
var _default = Wizard;
exports.default = _default;