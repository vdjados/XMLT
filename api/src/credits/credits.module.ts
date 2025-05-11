import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { FileService } from 'src/file.service';
import { Credit } from './entities/credit.entity';

@Module({
  controllers: [CreditsController],
  providers: [
    CreditsService,
    {
      provide: FileService,
      useFactory: () => new FileService<Credit[]>('assets/credits.json'),
    },
  ],
})
export class CreditsModule {}