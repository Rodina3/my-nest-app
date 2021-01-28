import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import loadConfig from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [loadConfig],
    }),
    CatModule,
    DatabaseModule,
  ],
})
export class AppModule {}
