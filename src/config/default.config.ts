import { Config } from './config.interface';
import { CatEntity } from '../cat/service/entity/cat.entity';

export const ENTITIES = [CatEntity];

export const defaultConfig: Config = {
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
    entities: [...ENTITIES],
    migrations: [__dirname + '/migration/{*.js,*.ts}'],
    migrationsRun: true,
    logging: true,
  },
};
