import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { CreateCatDto } from '../dto/create-cat.dto';

describe('CatService', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatService],
    }).compile();

    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve all cats', () => {
    expect(service.retrieveCats()).toEqual('This action retrieves all cats.');
  });

  it('should retrieve cat by id', () => {
    const id = 123;
    expect(service.retrieveCatById(id)).toEqual(
      `This action retrieve cat with id ${id}`,
    );
  });

  it('should create cat', () => {
    const createCatDto: CreateCatDto = new CreateCatDto('Amy', 5, 'White');
    expect(service.createCat(createCatDto)).toEqual(
      `This action adds cat with name: ${createCatDto.name}, age: ${createCatDto.age} and color: ${createCatDto.color}`,
    );
  });
});
