import { Module } from '@nestjs/common';
import { CatController } from './controller/cat.controller';
import { CatService } from './service/cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './service/entity/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
