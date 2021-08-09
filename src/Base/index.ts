import { Composer } from '../Composer';
import { Context } from '../Context';
import { Middleware } from '../Middleware';

class Base<C extends Context = Context> extends Composer<C> {
  id: string;

  constructor(id: string, ...middlewares: Array<Middleware<C>>) {
    super(...middlewares);
    this.id = id;
  }
}

export default Base;
