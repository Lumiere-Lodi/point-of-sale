import config from '@config/index';
import { AddressInfo } from 'net';
import { logger } from '@config/logger';
import http from 'http';
import swaggerRouter from './docs/swagger';
import express from 'express';

// This is a different set up of the application that offers us swagger as a documentation for API. 
// When set up fully we can see the endpoints, requests, response from this page. 
// @todo: set up swagger fully. 
async function startServer() {
  const app = express();

  app.use('/', swaggerRouter);

  const server = http.createServer(app).listen({ host: config.host, port: config.port }, async () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(`Swagger ready at http://${addressInfo.address}:${addressInfo.port} (${config.env} environment)`);
  });

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      logger.info(`process.once ${type}`);

      server.close(() => {
        logger.debug('HTTP server closed');
      });
    });
  });
}

startServer();
