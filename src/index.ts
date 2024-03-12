import config from '@config/index';
import { createServer } from '@config/express';
import { AddressInfo } from 'net';
import { logger } from '@config/logger';
import http from 'http';

async function startServer() {
  const app = createServer();

  const server = http.createServer(app).listen({ host: config.host, port: config.port }, async () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(`Server ready at http://${addressInfo.address}:${addressInfo.port} (${config.env} environment)`);
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
