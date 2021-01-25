import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { CatService } from '../service/cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ApiTags } from '@nestjs/swagger';
import { CatEntity } from '../entity/cat.entity';

@ApiTags('cats')
@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  getAllCats(): Promise<CatEntity[]> {
    return this.catService.retrieveCats();
  }

  @Get(':id')
  getCatById(@Param('id') id: number): Promise<CatEntity> {
    return this.catService.retrieveCatById(id);
  }

  @Post()
  createCat(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
    return this.catService.createCat(createCatDto);
  }

  @Delete(':id')
  deleteCatById(@Param('id') id: number): string {
    throw new NotImplementedException('Not implement yet');
  }
}
