"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class WizardContextWizard {
  constructor(ctx, steps) {
    this.steps = steps;
    this.ctx = ctx;
    this.cursor = ctx.scene.session.cursor ?? 0;
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
    return this.selectStep(this.cursor + 1);
  }

  back() {
    return this.selectStep(this.cursor - 1);
  }

}

exports.default = WizardContextWizard;