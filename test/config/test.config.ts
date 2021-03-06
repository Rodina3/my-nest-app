import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import { Config } from '../../dist/config/config.interface';
import { ENTITIES } from '../../src/config/default.config';

export const testConfig = {
  app: {
    name: 'my-nest-app',
    host: 'localhost',
    port: 3000,
  },
  swagger: {
    path: 'api-docs',
  },
  database: {
    type: 'postgres',
    url: 'postgresql://postgres:password@localhost:5432/postgres',
    schema: 'test',
    entities: [...ENTITIES],
    migrations: [__dirname + '/migration/{*.js,*.ts}'],
    migrationsRun: true,
  },
};

export const loadTestConfig: ConfigFactory = () => testConfig as Config;
