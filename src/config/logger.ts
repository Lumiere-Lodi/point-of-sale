import winston from 'winston';

const { format, transports } = winston;

const LoggerWrapper = (): winston.Logger => {
  return winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.align(),
          format.splat(),
          format.json(),
          format.printf((info) => {
            return `${info.timestamp} - ${info.level}]: ${info.message} ${
              info.data ? JSON.stringify(info.data, null, '  ') : ''
            }`;
          }),
        ),
      }),
    ],
    exitOnError: false,
  });
};

export const logger = LoggerWrapper();
