import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('GET /cats', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect('This action retrieves all cats.');
  });

  it('GET /cats/:id', async (done) => {
    const id = 123;
    const response = await request(app.getHttpServer()).get(`/cats/${id}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe(`This action retrieve cat with id ${id}`);
    done();
  });

  it('DELETE /cats/:id', async (done) => {
    const id = 123;
    const response = await request(app.getHttpServer()).delete(`/cats/${id}`);

    expect(response.status).toBe(501);
    expect(response.body.message).toBe(`Not implement yet`);
    done();
  });

  describe('POST /cats', () => {
    it('should create successfully given valid parameters', async (done) => {
      const name = 'Amy';
      const age = 3;
      const color = 'white';

      const response = await request(app.getHttpServer())
        .post('/cats')
        .send({ name: 'Amy', age: 3, color: 'white' });

      expect(response.status).toBe(201);
      expect(response.text).toBe(
        `This action adds cat with name: ${name}, age: ${age} and color: ${color}`,
      );
      done();
    });

    // it('should create failed given invalid parameters', async (done) => {
    //   const response = await request(app.getHttpServer())
    //     .post('/cats')
    //     .send({ name: '', age: 100, color: 123 });
    //
    //   console.log(response);
    //   expect(response.status).toBe(400);
    //
    //   done();
    // });
  });

  afterAll(async () => await app.close());
});
