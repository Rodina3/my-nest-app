import { CatEntity } from '../cat/entity/cat.entity';
import { Config } from './config.interface';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';

const ENTITIES = [CatEntity];

const createConfig: ConfigFactory = (): Config => ({
  port: 3000,
  appName: 'my-nest-app',
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [...ENTITIES],
    migrations: [__dirname + '/migration/{*.js,*.ts}'],
    migrationsRun: true,
    logging: true,
  },
});

export default createConfig;
