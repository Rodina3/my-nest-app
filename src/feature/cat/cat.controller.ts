import { Controller, Get, Param } from '@nestjs/common';
import { CatService } from './cat.service';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  getAllCats(): string {
    return this.catService.retrieveCats();
  }

  @Get(':id')
  getCatById(@Param('id') id: number): string {
    return this.catService.retrieveCatById(id);
  }
}
