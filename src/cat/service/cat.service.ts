import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from '../entity/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity) private catRepository: Repository<CatEntity>,
  ) {}

  private readonly logger = new Logger('CatService');

  retrieveCats(): Promise<CatEntity[]> {
    this.logger.log('retrieve all cats');
    return this.catRepository.find();
  }

  async retrieveCatById(id: number): Promise<CatEntity> {
    this.logger.log(`retrieve cat by id: ${id}`);
    const cat = await this.catRepository.findOne(id);
    if (!cat) {
      throw new NotFoundException(`cat with id: ${id} not found`);
    } else {
      return cat;
    }
  }

  addCat(newCatEntity: CatEntity): Promise<CatEntity> {
    this.logger.log(`add cat: ${JSON.stringify(newCatEntity)}`);
    return this.catRepository.save(newCatEntity);
  }
}
