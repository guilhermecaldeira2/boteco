"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
class Server {
  constructor(webhookObj) {
    const {
      port,
      webhook
    } = webhookObj;
    this.app = new _App.default();
    this.app.express.listen(port, () => console.log(`BOT start...\nReceiving in <HOST>:${port}${webhook}/income`));
  }

}

var _default = Server;
exports.default = _default;