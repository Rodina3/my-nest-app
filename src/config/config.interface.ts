import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface Config {
  app: {
    host: string;
    port: number | string;
    name: string;
  };
  swagger: {
    path: string;
  };
  database: TypeOrmModuleOptions;
}
