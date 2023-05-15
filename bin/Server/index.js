"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _colors = _interopRequireDefault(require("colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Server {
  constructor(configuration) {
    _defineProperty(this, "start", () => {
      return this.express.listen(this.port, () => {
        // eslint-disable-next-line no-console
        console.log(_colors.default.green(`Bot listening on <HOST>:${this.port}${this.webhookPath}/income`));
      });
    });

    this.express = configuration.express;
    this.port = configuration.port;
    this.webhookPath = configuration.webhookPath;
  }

}

exports.default = Server;