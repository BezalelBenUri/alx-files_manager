import express from 'express';

import injectRoutes from './routes';

const server = express();

injectRoutes(server);
startServer(server);

export default server;
