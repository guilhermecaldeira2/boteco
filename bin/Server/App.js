"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  express = (0, _express.default)();

  constructor() {
    this.express.use(_express.default.json());
    this.express.use((0, _morgan.default)('dev'));
  }

}

var _default = App;
exports.default = _default;