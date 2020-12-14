import logger from './logger';
import app from './app';

const port = app.get('port');
const server = app.listen(port);


// I've add this to catch uncaught errors at global level
// Errors swallowed in Promises whithout catch() will be caugth
process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
