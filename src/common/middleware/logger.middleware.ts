import { Logger } from '../utils/logger';

export function logger(req, res, next) {
  next();

  const statusCode = res.statusCode;
  const logMessage = `${req.method} ${req.originalUrl} ip: ${req.ip} statusCode: ${statusCode}`;

  if (statusCode >= 500) {
    Logger.error(logMessage);
  } else if (statusCode >= 400) {
    Logger.warn(logMessage);
  } else {
    Logger.log(logMessage);
  }
}
