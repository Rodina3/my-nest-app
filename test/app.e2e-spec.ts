import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '../src/common/pipe/validation.pipe';
import { ValidationExceptionFilter } from '../src/common/filter/validation-exception.filter';
import { HttpErrorExceptionFilter } from '../src/common/filter/http-exception.filter';

describe('App e2e tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new ValidationExceptionFilter());
    app.useGlobalFilters(new HttpErrorExceptionFilter());
    await app.init();
  });

  afterAll(async () => await app.close());

  // it('GET /cats', () => {
  //   return request(app.getHttpServer())
  //     .get('/cats')
  //     .expect(200)
  //     .expect('This action retrieves all cats.');
  // });
  //
  // it('GET /cats/:id', async (done) => {
  //   const id = 123;
  //   const response = await request(app.getHttpServer()).get(`/cats/${id}`);
  //
  //   expect(response.status).toBe(200);
  //   expect(response.body.id).toBe(123);
  //   done();
  // });

  it('DELETE /cats/:id', async (done) => {
    const id = 123;
    const response = await request(app.getHttpServer()).delete(`/cats/${id}`);

    expect(response.status).toBe(501);
    expect(response.body.message).toBe(`Not implement yet`);
    done();
  });

  describe('POST /cats', () => {
    // it('should add successfully given valid parameters', async (done) => {
    //   const name = 'Amy';
    //   const age = 3;
    //   const color = 'white';
    //
    //   const response = await request(app.getHttpServer())
    //     .post('/cats')
    //     .send({ name: 'Amy', age: 3, color: 'white' });
    //
    //   expect(response.status).toBe(201);
    //   expect(response.text).toBe(
    //     `This action adds cat with name: ${name}, age: ${age} and color: ${color}`,
    //   );
    //   done();
    // });

    it('should add failed given invalid parameters', async (done) => {
      const response = await request(app.getHttpServer())
        .post('/cats')
        .send({ name: '', age: 100, color: 123 });

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
});
