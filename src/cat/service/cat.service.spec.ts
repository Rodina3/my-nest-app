import { CatService } from './cat.service';
import { CreateCatDto } from '../controller/dto/create-cat.dto';
import { CatEntity } from '../entity/cat.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CatServiceTest', () => {
  let mockRepo: Repository<CatEntity>;
  let service: CatService;

  beforeEach(() => {
    mockRepo = new Repository<CatEntity>();
    service = new CatService(mockRepo);
  });

  it('should retrieve all cats when retrieveCats', async () => {
    const catEntities = [buildCatEntity(1), buildCatEntity(2)];
    mockRepo.find = jest.fn(() => Promise.resolve(catEntities));

    const result = await service.retrieveCats();
    expect(result.length).toBe(2);
  });

  describe('when retrieveCatById', () => {
    it('should retrieve cat by id given id exist in repo', async () => {
      const id = 1;
      const catEntity = buildCatEntity(id);
      mockRepo.findOne = jest.fn(() => Promise.resolve(catEntity));

      const result = await service.retrieveCatById(id);

      expect(result).toEqual(catEntity);
    });

    it('should throw NotFoundException given id not exist in repo', async () => {
      const id = 999;
      mockRepo.findOne = jest.fn(() => Promise.resolve(undefined));

      expect.assertions(2);
      try {
        await service.retrieveCatById(id);
      } catch (ex) {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toHaveProperty('message', `cat with id: ${id} not found`);
      }
    });
  });

  it('should return created cat when createCat given cat', async () => {
    const catEntity = buildCatEntity(1);
    const createCatDto: CreateCatDto = new CreateCatDto(
      catEntity.name,
      catEntity.age,
      catEntity.color,
    );
    mockRepo.save = jest.fn((): any => Promise.resolve(catEntity));

    const result = await service.createCat(createCatDto);
    expect(result).toEqual(catEntity);
  });
});

function buildCatEntity(id: number): CatEntity {
  const cat = new CatEntity('amy', 'color', 12);
  cat.id = id;
  return cat;
}
