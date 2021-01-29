import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '../src/common/pipe/validation.pipe';
import { ValidationExceptionFilter } from '../src/common/filter/validation-exception.filter';
import { HttpExceptionFilter } from '../src/common/filter/http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { loadTestConfig, testConfig } from './config/test.config';
import {
  cleanDataInCatTable,
  createTestSchema,
  dropTestSchema,
  initDataInCatTable,
} from './test-helper/utils';
import { Client } from 'pg';

describe('App e2e tests', () => {
  let app: INestApplication;
  let dbClient: Client;

  beforeAll(async () => {
    dbClient = new Client({ connectionString: testConfig.database.url });
    await dbClient.connect();
    await createTestSchema(dbClient);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [loadTestConfig],
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(
      new ValidationExceptionFilter(),
      new HttpExceptionFilter(),
    );

    await app.init();
  });

  beforeEach(async () => await initDataInCatTable(dbClient));

  afterEach(async () => await cleanDataInCatTable(dbClient));

  afterAll(async () => {
    await app.close();
    await dropTestSchema(dbClient);
    await dbClient.end();
  });

  describe('GET /cats/:id', () => {
    it('should return 200 with cat', async (done) => {
      const id = 1;
      const response = await request(app.getHttpServer()).get(`/cats/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        name: 'amy',
        color: 'white',
        age: 12,
        id: 1,
      });
      done();
    });
  });

  describe('DELETE /cats/:id', () => {
    it('should return 501 with error message', async (done) => {
      const id = 123;
      const response = await request(app.getHttpServer()).delete(`/cats/${id}`);

      expect(response.status).toBe(501);
      expect(response.body.message).toBe(`Not implement yet`);
      done();
    });
  });

  describe('POST /cats', () => {
    it('should return 201 with cat given valid parameters', async (done) => {
      const validData = { name: 'Amy', age: 3, color: 'white' };
      const response = await request(app.getHttpServer())
        .post('/cats')
        .send(validData);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Amy');
      expect(response.body.age).toBe(3);
      expect(response.body.color).toBe('white');
      done();
    });

    it('should return 400 with error message given invalid parameters', async (done) => {
      const invalidData = { name: '', age: 100, color: 123 };
      const response = await request(app.getHttpServer())
        .post('/cats')
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Bad Request Exception',
        details: [
          {
            pointer: 'name',
            message: 'name is too short',
          },
          {
            pointer: 'age',
            message: 'age must be less than 30',
          },
          {
            pointer: 'color',
            message: 'color must be a string',
          },
        ],
      });
      done();
    });
  });

  describe('GET /cats', () => {
    it('should return 200 with cat list', async (done) => {
      const result = await request(app.getHttpServer()).get('/cats');

      expect(result.status).toBe(200);
      expect(result.body.length).toBe(4);
      expect(result.body).toEqual([
        { age: 12, color: 'white', id: 1, name: 'amy' },
        { age: 3, color: 'black', id: 2, name: 'bob' },
        { age: 5, color: 'orange', id: 3, name: 'cindy' },
        { age: 18, color: 'yellow', id: 4, name: 'david' },
      ]);
      done();
    });
  });
});
