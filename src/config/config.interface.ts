import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface Config {
  port: number;
  appName: string;
  database: TypeOrmModuleOptions;
}
