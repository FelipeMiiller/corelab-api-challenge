/*
https://docs.nestjs.com/modules
*/

import { ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
