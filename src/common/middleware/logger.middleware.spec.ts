import { logger } from './logger.middleware';
import { Logger } from '../utils/logger';
import { Request, Response, NextFunction } from 'express';

describe('Logger middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    nextFunction = jest.fn();
    mockRequest = {
      method: 'method',
      originalUrl: 'url',
      ip: 'ip',
    };
    mockResponse = {};
  });

  it('should use Logger.error given status code >= 500', async () => {
    mockResponse = {
      statusCode: 500,
    };
    const errorSpy = jest.spyOn(Logger, 'error');
    const expectedLog = `${mockRequest.method} ${mockRequest.originalUrl} ip: ${mockRequest.ip} statusCode: ${mockResponse.statusCode}`;

    await logger(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(expectedLog);
  });

  it('should use Logger.warn given status code >= 400 AND < 500', async () => {
    mockResponse = {
      statusCode: 400,
    };
    const warnSpy = jest.spyOn(Logger, 'warn');
    const expectedLog = `${mockRequest.method} ${mockRequest.originalUrl} ip: ${mockRequest.ip} statusCode: ${mockResponse.statusCode}`;

    await logger(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
    expect(warnSpy).toBeCalledWith(expectedLog);
  });

  it('should use Logger.log given status code < 400', async () => {
    mockResponse = {
      statusCode: 200,
    };
    const logSpy = jest.spyOn(Logger, 'log');
    const expectedLog = `${mockRequest.method} ${mockRequest.originalUrl} ip: ${mockRequest.ip} statusCode: ${mockResponse.statusCode}`;

    await logger(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(expectedLog);
  });
});
