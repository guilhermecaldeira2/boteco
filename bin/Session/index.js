"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Session = Session;
exports.default = void 0;

var _nodeCache = _interopRequireDefault(require("node-cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
function getSessionKey(ctx) {
  return ctx.from.user.id;
}

function Session() {
  const store = new _nodeCache.default({
    stdTTL: 3600
  });
  const sessionKey = getSessionKey;
  return async (ctx, next) => {
    const key = sessionKey(ctx);
    ctx.session = store.get(key);

    if (!ctx.session) {
      store.set(key, {});
      ctx.session = {};
    }

    console.log('awaiting');
    await next();
    console.log('saved');

    if (!ctx.session) {
      store.del(key);
    } else {
      console.log(ctx.session);
      store.set(key, ctx.session);
    }
  };
}

var _default = Session;
exports.default = _default;