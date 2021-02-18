import App from './App';
export interface WebhookObj {
    port: string;
    webhook: string;
}
declare class Server {
    app: App;
    constructor(webhookObj: WebhookObj);
}
export default Server;
