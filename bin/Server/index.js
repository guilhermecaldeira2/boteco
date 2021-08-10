"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _colors = _interopRequireDefault(require("colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server {
  constructor(configuration) {
    this.express = configuration.express;
    this.port = configuration.port;
    this.webhookPath = configuration.webhookPath;
  }

  start = () => {
    return this.express.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(_colors.default.green(`Bot listening on <HOST>:${this.port}/${this.webhookPath}/income`));
    });
  };
}

exports.default = Server;