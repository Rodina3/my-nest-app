import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  retrieveCats(): string {
    return 'This action retrieves all cats.';
  }
}
