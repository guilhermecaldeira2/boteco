import { Express } from 'express';
import colors from 'colors';

export interface ServerConfiguration {
  port: number;
  webhookPath: string;
  express: Express;
}

export default class Server {
  private express: Express;

  private port: number;

  private webhookPath: string;

  constructor(configuration: ServerConfiguration) {
    this.express = configuration.express;
    this.port = configuration.port;
    this.webhookPath = configuration.webhookPath;
  }

  public start = () => {
    return this.express.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(colors.green(`Bot listening on <HOST>:${this.port}/${this.webhookPath}/income`));
    });
  };
}
