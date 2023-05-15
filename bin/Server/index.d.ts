/// <reference types="node" />
import { Express } from 'express';
export interface ServerConfiguration {
    port?: number;
    webhookPath?: string;
    express?: Express;
}
export default class Server {
    private express;
    private port;
    private webhookPath;
    constructor(configuration: ServerConfiguration);
    start: () => import("http").Server;
}
