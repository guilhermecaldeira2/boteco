"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BotMakerChannel", {
  enumerable: true,
  get: function () {
    return _Channel.BotMakerChannel;
  }
});
Object.defineProperty(exports, "Composer", {
  enumerable: true,
  get: function () {
    return _Composer.Composer;
  }
});
Object.defineProperty(exports, "Context", {
  enumerable: true,
  get: function () {
    return _Context.Context;
  }
});
Object.defineProperty(exports, "Wizard", {
  enumerable: true,
  get: function () {
    return _Wizard.Wizard;
  }
});
Object.defineProperty(exports, "Stage", {
  enumerable: true,
  get: function () {
    return _Stage.Stage;
  }
});
Object.defineProperty(exports, "Session", {
  enumerable: true,
  get: function () {
    return _Session.Session;
  }
});
exports.default = void 0;

var _express = _interopRequireWildcard(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _Server = _interopRequireDefault(require("./Server"));

var _Channel = _interopRequireWildcard(require("./BotMaker/Channel"));

var _Composer = require("./Composer");

var _Context = require("./Context");

var _Wizard = require("./Wizard");

var _Stage = require("./Stage");

var _Session = require("./Session");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function always(x) {
  return () => x;
}

const noop = always(Promise.resolve());

class Boteco extends _Composer.Composer {
  constructor(configuration) {
    super();

    _defineProperty(this, "webhookHandler", () => {
      const router = (0, _express.Router)();
      router.post('/income', async (req, res) => {
        res.sendStatus(200);
        const {
          contextType,
          TOKEN
        } = this.botecoConfiguration;
        const acceptedContextType = {
          botmaker: new _Channel.default(TOKEN, req)
        };
        const channelContext = acceptedContextType[contextType];

        if (channelContext) {
          const context = new _Context.Context(channelContext);
          await this.middleware()(context, noop);
        }
      });
      return router;
    });

    this.botecoConfiguration = configuration;
    this.serverConfiguration = {
      express: configuration.express || (0, _express.default)(),
      port: configuration.port || parseInt(process.env.PORT, 10) || 5555,
      webhookPath: configuration.webhookPath || '/webhook'
    };
    this.express = this.serverConfiguration.express;
  }

  launch(router) {
    this.express.use(_express.default.json());
    this.express.use((0, _cors.default)());
    this.express.use(this.serverConfiguration.webhookPath, this.webhookHandler());

    if (router) {
      this.express.use(router);
    }

    const server = new _Server.default(this.serverConfiguration);
    server.start();
  }

}

exports.default = Boteco;