import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/ioC/app.module';
import { CreateTasksDto } from 'src/modules/tasks/http/dtos/create-tasks.dto';
import { TasksService } from 'src/modules/tasks/domain/tasks.service';
import { ColorsTasks } from 'src/common/constants/colorsTask';
import { UpdateTasksDto } from 'src/modules/tasks/http/dtos/update-tasks.dto';
import exp from 'constants';

const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const title = 'Task 1';
const tasks: CreateTasksDto[] = [
  {
    title: title,
    description: 'This is the first task',
    isFavorite: false,
    color: ColorsTasks[2],
    filePath: null,
  },
  {
    title: title,
    description: 'This is the second task',
    isFavorite: true,
    color: ColorsTasks[1],
    filePath: 'https://www.example.com/file1.pdf',
  },
];

const taskDto: CreateTasksDto = {
  title: 'Test Task',
  description: 'This is a test task',
  filePath: 'https://www.exemple.com/',
};

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let tasksService: TasksService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();

    tasksService = moduleFixture.get<TasksService>(TasksService);
  });

  afterAll(async () => {
    await tasksService.deleteAll();
  });

  it('(POST /tasks) should return a validation error when sending invalid task data ', async () => {
    const taskDto = {
      description: 3123,
      color: '34fd4',
      isFavorite: 23123,
      filePath: 'sdf',
    };
    const { body } = await request(app.getHttpServer()).post('/tasks').send(taskDto).expect(400);

    expect(body).toEqual({
      message: [
        'title must be a string',
        'title should not be empty',
        'description must be a string',
        'isFavorite must be a boolean value',
        'color must be one of the following values: #D9D9D9, #BAE2FF, #B9FFDD, #FFE8AC, #FFCAB9, #F99494, #9DD6FF, #ECA1FF, #DAFF8B, #FFA285, #CDCDCD, #979797, #A99A7C',
        'filePath must be a URL address',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it('(POST /tasks) should create a new task and get it back', async () => {
    const { body: createTask } = await request(app.getHttpServer()).post('/tasks').send(taskDto).expect(201);

    expect(createTask.id).toMatch(regexUUID);
    expect(createTask.title).toBe(taskDto.title);
    expect(createTask.description).toBe(taskDto.description);
    expect(createTask.isFavorite).toBe(false);
    expect(createTask.color).toBe(ColorsTasks[0]);
    expect(createTask.filePath).toBe(taskDto.filePath);
    expect(new Date(createTask.updatedAt)).toBeInstanceOf(Date);
    expect(new Date(createTask.createdAt)).toBeInstanceOf(Date);
    expect(createTask.createdAt).toBe(createTask.updatedAt);

    const { body: getTask } = await request(app.getHttpServer()).get(`/tasks/${createTask.id}`).send().expect(200);

    expect(getTask).toBeDefined();
    expect(getTask).toEqual(createTask);
  });

  it('/tasks (GET) should return all tasks and verify titles iguals ', async () => {
    await tasksService.create(tasks[0]);
    await tasksService.create(tasks[1]);

    const response = await request(app.getHttpServer()).get('/tasks').expect(200);

    expect(response.body[1].title).toBe(title);
    expect(response.body[1].description).toBe(tasks[0].description);
    expect(response.body[1].isFavorite).toBe(tasks[0].isFavorite);
    expect(response.body[1].color).toBe(tasks[0].color);
    expect(response.body[1].createdAt == response.body[1].updatedAt).toBe(true);
    expect(response.body[1].filePath).toBe(tasks[0].filePath);

    expect(response.body[2].title).toBe(title);
    expect(response.body[2].description).toBe(tasks[1].description);
    expect(response.body[2].isFavorite).toBe(tasks[1].isFavorite);
    expect(response.body[2].color).toBe(tasks[1].color);
    expect(response.body[2].filePath).toBe(tasks[1].filePath);
  });

  it('/tasks/:id (PATCH) should update a task by ID', async () => {
    const findTask = (await tasksService.findMany())[2];

    const updateTaskDto: UpdateTasksDto = {
      title: 'Updated Task',
      description: 'This is an updated task',
    };

    const { body: updateTask } = await request(app.getHttpServer())
      .patch(`/tasks/${findTask.id}`)
      .send(updateTaskDto)
      .expect(200);

    expect(updateTask).toHaveProperty('id');
    expect(updateTask.title).toBe(updateTaskDto.title);
    expect(updateTask.description).toBe(updateTaskDto.description);
    expect(updateTask.isFavorite).toBe(findTask.isFavorite);
    expect(updateTask.color).toBe(findTask.color);
    expect(new Date(updateTask.createdAt)).toBeInstanceOf(Date);
    expect(new Date(updateTask.updatedAt)).toBeInstanceOf(Date);
    expect(updateTask.updatedAt !== updateTask.createdAt).toBe(true);





    const updatedTask = await tasksService.findById(findTask.id);
    expect(updatedTask).toBeDefined();
    expect(updatedTask.title).toBe(updateTaskDto.title);
    expect(updatedTask.description).toBe(updateTaskDto.description);
    expect(updatedTask.updatedAt !== updatedTask.createdAt).toBe(true);
  });




  it('/tasks/:id (DELETE) should delete a task by ID', async () => {
    const task: CreateTasksDto = {
      title: 'Test Task',
      description: 'This is a test task',
    };

    const createdTask = await tasksService.create(task);

    await request(app.getHttpServer()).delete(`/tasks/${createdTask.id}`).expect(200);

    const deletedTask = await tasksService.findById(createdTask.id);
    expect(deletedTask).toBe(null);
  });
});
