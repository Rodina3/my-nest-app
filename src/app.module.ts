import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [config],
    }),
    CatModule,
    DatabaseModule,
  ],
})
export class AppModule {}
