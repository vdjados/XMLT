// src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CreditsModule } from './credits/credits.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

@Module({
  imports: [
    CreditsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
