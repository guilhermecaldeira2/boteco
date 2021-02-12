import Composer from '@src/Composer';
import Context from '@src/Context';
import { Middleware } from '@src/Middleware';

class Base<C extends Context = Context> extends Composer<C> {
  id: string;

  constructor(id: string, ...middlewares: Array<Middleware<C>>) {
    super(...middlewares);
    this.id = id;
  }
}

export default Base;
