import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV || 'local'}.env`,
      load: [config],
    }),
    CatModule,
    DatabaseModule,
  ],
})
export class AppModule {}
