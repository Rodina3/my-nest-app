import { CatEntity } from '../cat/entity/cat.entity';
import { Config } from './config.interface';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';

const ENTITIES = [CatEntity];

const createConfig: ConfigFactory = (): Config => ({
  app: {
    name: process.env.APP_NAME || 'my-nest-app',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
  swagger: {
    path: 'api-docs',
  },
  database: {
    type: 'postgres',
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:password@localhost:5432/postgres',
    entities: [...ENTITIES],
    migrations: [__dirname + '/migration/{*.js,*.ts}'],
    migrationsRun: true,
    logging: true,
  },
});

export default createConfig;
