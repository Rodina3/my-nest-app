import { Module } from '@nestjs/common';
import { CatController } from './cat/cat.controller';
import { CatService } from './cat/cat.service';

@Module({
  controllers: [CatController],
  providers: [CatService],
})
export class FeatureModule {}
