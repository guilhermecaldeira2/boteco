"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class WizardContextWizard {
  constructor(ctx, steps) {
    var _ctx$scene$session$cu;

    this.steps = steps;
    this.ctx = ctx;
<<<<<<< HEAD
    this.cursor = ctx.scene.session.cursor ?? 0;
=======
    this.cursor = (_ctx$scene$session$cu = ctx.scene.session.cursor) !== null && _ctx$scene$session$cu !== void 0 ? _ctx$scene$session$cu : 0;
>>>>>>> 9ae038c389fb578c610302cfd8ac2645c8233392
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