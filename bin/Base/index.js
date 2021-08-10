"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Composer = require("../Composer");

class Base extends _Composer.Composer {
  constructor(id, ...middlewares) {
    super(...middlewares);
    this.id = id;
  }

}

var _default = Base;
exports.default = _default;