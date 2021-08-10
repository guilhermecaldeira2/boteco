import { Composer } from '../Composer';
import { Context } from '../Context';
import { Middleware } from '../Middleware';
declare class Base<C extends Context = Context> extends Composer<C> {
    id: string;
    constructor(id: string, ...middlewares: Array<Middleware<C>>);
}
export default Base;
