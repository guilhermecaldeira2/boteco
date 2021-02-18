/* eslint-disable no-shadow */
import { Router } from 'express';
import BotMakerContext from './BotMaker/Context';
import Composer from './Composer';
import Context from './Context';
import Server from './Server';

function always<T>(x: T) {
  return () => x;
}
const noop = always(Promise.resolve());

export interface BotecoOptions {
  webhook?: {
    port?: string;
    webhook?: string;
  };
  contextType: 'botmaker';
  TOKEN: string;
}

export class Boteco<C extends Context = Context> extends Composer<C> {
  private server: Server;

  private port: string;

  private webhook: string;

  /**
   * @param options pass context type for change webhook host, need token for connection;
   */
  constructor(private readonly options: BotecoOptions) {
    super();
    this.port = options.webhook?.port ?? process.env.PORT ?? '5555';
    this.webhook = options.webhook?.webhook ?? '/api/v1/webhook';
  }

  webhookHandler() {
    const router = Router();

    router.post('/income', async (req, res) => {
      const { contextType } = this.options;
      const acceptedContextType = {
        botmaker: new BotMakerContext(this.options.TOKEN, req),
      };

      const ctx = new Context(acceptedContextType[contextType]) as C;

      await Promise.resolve(this.middleware()(ctx, noop));
      return res.sendStatus(200);
    });

    return router;
  }

  /**
   * Starts polling hook
   */
  launch() {
    this.server = new Server({ port: this.port, webhook: this.webhook });
    this.server.app.express.use(this.webhook, this.webhookHandler());
  }
}

export default Boteco;
