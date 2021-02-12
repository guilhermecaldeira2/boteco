/* eslint-disable no-console */
import App from './App';

export interface WebhookObj {
  port: string;
  webhook: string;
}

class Server {
  public app: App;

  constructor(webhookObj: WebhookObj) {
    const { port, webhook } = webhookObj;
    this.app = new App();
    this.app.express.listen(port, () =>
      console.log(`BOT start...\nReceiving in in:${process.env.HOST}:${port}${webhook}/income`),
    );
  }
}

export default Server;
