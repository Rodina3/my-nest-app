import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from '../feature/entity/cat.entity';

const ENTITIES = [CatEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [...ENTITIES],
      migrations: [__dirname + '/migration/{*.js,*.ts}'],
      migrationsRun: true,
      dropSchema: false,
      synchronize: false,
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
