import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from '../dto/create-cat.dto';

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

  @Post()
  createCat(@Body() createCatDto: CreateCatDto): string {
    return this.catService.createCat(createCatDto);
  }
}
