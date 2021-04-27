"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-use-before-define */

/* eslint-disable no-empty-function */

/* eslint-disable no-unused-vars */

/* eslint-disable no-useless-constructor */

/* eslint-disable constructor-super */
// export interface WizardContext<D extends WizardSessionData = WizardSessionData> extends Context {
//   session: WizardSession<D>;
//   scene: SceneContext<WizardContext<D>, D>;
//   wizard: WizardContextWizard<WizardContext<D>>;
// }
class WizardContextWizard {
  constructor(ctx, steps) {
    this.ctx = ctx;
    this.steps = steps;
    this.cursor = ctx.scene.session.cursor || 0;
  }

  get step() {
    return this.steps[this.cursor];
  }

  get cursor() {
    return this.ctx.scene.session.cursor;
  }

  set cursor(cursor) {
    this.ctx.scene.session.cursor = cursor;
  }

  selectStep(index) {
    this.cursor = index;
    return this;
  }

  next() {
    this.selectStep(this.cursor + 1);
    console.log(this.cursor);
    return this;
  }

  back() {
    return this.selectStep(this.cursor - 1);
  }

}

var _default = WizardContextWizard;
exports.default = _default;