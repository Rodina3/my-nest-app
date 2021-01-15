import { Injectable } from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';

@Injectable()
export class CatService {
  retrieveCats(): string {
    return 'This action retrieves all cats.';
  }

  retrieveCatById(id: number): string {
    return `This action retrieve cat with id ${id}`;
  }

  createCat(createCatDto: CreateCatDto): string {
    return `This action adds cat with name: ${createCatDto.name}, age: ${createCatDto.age} and color: ${createCatDto.color}`;
  }
}
