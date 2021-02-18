"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Boteco = void 0;

var _express = require("express");

var _Context = _interopRequireDefault(require("./BotMaker/Context"));

var _Composer = _interopRequireDefault(require("./Composer"));

var _Context2 = _interopRequireDefault(require("./Context"));

var _Server = _interopRequireDefault(require("./Server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-shadow */
function always(x) {
  return () => x;
}

const noop = always(Promise.resolve());

class Boteco extends _Composer.default {
  /**
   * @param options pass context type for change webhook host, need token for connection;
   */
  constructor(options) {
    var _ref, _options$webhook$port, _options$webhook, _options$webhook$webh, _options$webhook2;

    super();
    this.options = options;
    this.port = (_ref = (_options$webhook$port = (_options$webhook = options.webhook) === null || _options$webhook === void 0 ? void 0 : _options$webhook.port) !== null && _options$webhook$port !== void 0 ? _options$webhook$port : process.env.PORT) !== null && _ref !== void 0 ? _ref : '5555';
    this.webhook = (_options$webhook$webh = (_options$webhook2 = options.webhook) === null || _options$webhook2 === void 0 ? void 0 : _options$webhook2.webhook) !== null && _options$webhook$webh !== void 0 ? _options$webhook$webh : '/api/v1/webhook';
  }

  webhookHandler() {
    const router = (0, _express.Router)();
    router.post('/income', async (req, res) => {
      const {
        contextType
      } = this.options;
      const acceptedContextType = {
        botmaker: new _Context.default(this.options.TOKEN, req)
      };
      const ctx = new _Context2.default(acceptedContextType[contextType]);
      await Promise.resolve(this.middleware()(ctx, noop));
      return res.sendStatus(200);
    });
    return router;
  }
  /**
   * Starts polling hook
   */


  launch() {
    this.server = new _Server.default({
      port: this.port,
      webhook: this.webhook
    });
    this.server.app.express.use(this.webhook, this.webhookHandler());
  }

}

exports.Boteco = Boteco;
var _default = Boteco;
exports.default = _default;