import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseModule } from './common/infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';



@Module({
  imports: [
    TasksModule,
    DatabaseModule,

  ],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }
