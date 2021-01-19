import { Injectable } from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';
import { Logger } from '../../utils/logger';

@Injectable()
export class CatService {
  retrieveCats(): string {
    Logger.info('retrieve all cats');
    return 'This action retrieves all cats.';
  }

  retrieveCatById(id: number): string {
    Logger.info(`retrieve cats: ${id}`);
    return `This action retrieve cat with id ${id}`;
  }

  createCat(createCatDto: CreateCatDto): string {
    Logger.info(`create cats: ${createCatDto.name}`);
    return `This action adds cat with name: ${createCatDto.name}, age: ${createCatDto.age} and color: ${createCatDto.color}`;
  }
}
