/* eslint-disable no-shadow */
import { Router } from 'express';
import BotMakerContext from './BotMaker/Context';
import Composer from './Composer';
import Context from './Context';
import Server from './Server';

function always<T>(x: T) {
  return () => x;
}
const anoop = always(Promise.resolve());

export interface BotecoOptions {
  webhook?: {
    port?: string;
    webhook?: string;
  };
  contextType: 'botmaker';
  TOKEN: string;
}

export class BOTECO<C extends Context = Context> extends Composer<C> {
  private readonly server: Server;

  constructor(private readonly options: BotecoOptions) {
    super();
    const port = options.webhook?.port ?? process.env.PORT ?? '5555';
    const webhook = options.webhook?.webhook ?? '/api/v1/webhook';
    this.server = new Server({ port, webhook });
    this.server.app.express.use(webhook, this.webhookHandler());
  }

  webhookHandler() {
    const router = Router();

    router.post('/income', async (req, res) => {
      const { contextType } = this.options;
      const acceptedContextType = {
        botmaker: new BotMakerContext(this.options.TOKEN, req),
      };

      const ctx = new Context(acceptedContextType[contextType]) as C;

      await Promise.resolve(this.middleware()(ctx, anoop));
      return res.sendStatus(200);
    });

    return router;
  }
}
