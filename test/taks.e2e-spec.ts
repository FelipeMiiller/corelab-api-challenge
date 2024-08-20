import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TasksModule } from '../src/modules/tasks/tasks.module';
import { AppModule } from 'src/ioC/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return tasks', () => {
    return request(app.getHttpServer()).get('/tasks').expect(200);
  });
});
