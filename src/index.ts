import express, { Router, Express } from 'express';

import Server, { ServerConfiguration } from './Server';
import BotMakerChannel from './BotMaker/Channel';
import { Composer } from './Composer';
import { Context } from './Context';

interface BotecoConfiguration extends ServerConfiguration {
  contextType: 'botmaker';
  TOKEN: string;
}

function always<T>(x: T) {
  return () => x;
}

const noop = always(Promise.resolve());

export default class Boteco<C extends Context = Context> extends Composer<C> {
  private botecoConfiguration: BotecoConfiguration;

  private serverConfiguration: ServerConfiguration;

  private express: Express;

  constructor(configuration: BotecoConfiguration) {
    super();
    this.botecoConfiguration = configuration;

    this.serverConfiguration = {
      express: configuration.express || express(),
      port: configuration.port || parseInt(process.env.PORT, 10) || 5555,
      webhookPath: configuration.webhookPath || '/webhook',
    };

    this.express = this.serverConfiguration.express;
  }

  webhookHandler = () => {
    const router = Router();

    router.post('/income', async (req, res) => {
      res.sendStatus(200);
      const { contextType, TOKEN } = this.botecoConfiguration;
      const acceptedContextType = {
        botmaker: new BotMakerChannel(TOKEN, req),
      };
      const channelContext = acceptedContextType[contextType];
      if (channelContext) {
        const context = new Context(channelContext);
        await this.middleware()(context as C, noop);
      }
    });

    return router;
  };

  launch(router?: Router): void {
    this.express.use(this.serverConfiguration.webhookPath, this.webhookHandler());
    if (router) {
      this.express.use(router);
    }
    const server = new Server(this.serverConfiguration);
    server.start();
  }
}

export { Context } from './Context';
export { Wizard } from './Wizard';
export { Stage } from './Stage';
export { Composer } from './Composer';
export { Session } from './Session';
