import { Config } from './config.interface';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import { defaultConfig } from './default.config';

const loadConfig: ConfigFactory = (): Config => {
  return defaultConfig;
};

export default loadConfig;
