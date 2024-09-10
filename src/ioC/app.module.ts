import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig, { pathEnv } from 'src/config/app.config';
import { TasksModule } from 'src/modules/tasks/tasks.module';
import { DatabaseModule } from './database.module';
import typeormConfig from 'src/config/typeorm.config';
import { LoggerModule } from 'src/common/loggers/logger.module';

@Module({
  imports: [
    TasksModule,
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: [pathEnv, '.env'],
      isGlobal: true,
      load: [appConfig, typeormConfig],
    }),
  ],

  exports: [ConfigModule],
})
export class AppModule {}
