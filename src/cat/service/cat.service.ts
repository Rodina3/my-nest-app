import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from '../controller/dto/create-cat.dto';
import { Logger } from '../../common/utils/logger';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from '../entity/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity) private catRepository: Repository<CatEntity>,
  ) {}

  retrieveCats(): Promise<CatEntity[]> {
    Logger.info('retrieve all cats');
    return this.catRepository.find();
  }

  async retrieveCatById(id: number): Promise<CatEntity> {
    Logger.info(`retrieve cat by id: ${id}`);
    const cat = await this.catRepository.findOne(id);
    if (!cat) {
      throw new NotFoundException(`cat with id: ${id} not found`);
    } else {
      return cat;
    }
  }

  createCat(createCatDto: CreateCatDto): Promise<CatEntity> {
    Logger.info(`create cats: ${JSON.stringify(createCatDto)}`);
    const { name, age, color } = createCatDto;
    const createCatEntity = new CatEntity(name, color, age);
    return this.catRepository.save(createCatEntity);
  }
}