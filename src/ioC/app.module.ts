import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { CreateTasksTable1723809312769 } from 'src/migrations/1723809312769-CreateTasksTable';
import appConfig, { pathEnv } from 'src/config/app.config';

import { TasksModule } from 'src/modules/tasks/tasks.module';
import { DatabaseModule } from './database.module';
import typeormConfig from 'src/config/typeorm.config';

@Module({
  imports: [
    TasksModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: [pathEnv, '.env'],
      isGlobal: true,
      load: [appConfig, typeormConfig],
    }),
  ],

  // Export the ConfigModule
  exports: [ConfigModule],
})
export class AppModule {}
