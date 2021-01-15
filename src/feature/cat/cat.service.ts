import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  retrieveCats(): string {
    return 'This action retrieves all cats.';
  }

  retrieveCatById(id: number): string {
    return `This action retrieve cat with id ${id}`;
  }
}
