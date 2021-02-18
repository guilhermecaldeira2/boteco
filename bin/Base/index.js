"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Composer = _interopRequireDefault(require("../Composer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Base extends _Composer.default {
  constructor(id, ...middlewares) {
    super(...middlewares);
    this.id = id;
  }

}

var _default = Base;
exports.default = _default;