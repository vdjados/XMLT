// src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CreditsModule } from './credits/credits.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileService } from './file.service';
import * as path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..');

@Module({
  imports: [
    CreditsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: FileService,
      useValue: new FileService(path.join(PROJECT_ROOT, 'src', 'assets', 'credits.json')),
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
