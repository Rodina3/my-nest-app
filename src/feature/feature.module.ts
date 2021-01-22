import { Module } from '@nestjs/common';
import { CatController } from './cat/cat.controller';
import { CatService } from './cat/cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './entity/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatController],
  providers: [CatService],
})
export class FeatureModule {}
