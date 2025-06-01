import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { FileService } from 'src/file.service';
import { Credit } from './entities/credit.entity';
import * as path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

@Module({
  controllers: [CreditsController],
  providers: [
    CreditsService,
    {
      provide: FileService,
      useFactory: () => new FileService<Credit[]>(path.join(PROJECT_ROOT, 'src', 'assets', 'credits.json')),
    },
  ],
})
export class CreditsModule {}