"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Api {
  constructor() {
    this.instance = _axios.default.create({
      baseURL: 'https://go.botmaker.com'
    });
  }

}

var _default = new Api();

exports.default = _default;