import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FileService } from '../file.service';
import { Credit } from './entities/credit.entity';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Injectable()
export class CreditsService {
  constructor(private fileService: FileService<Credit[]>) {}

  /** Получить все карточки, опционально отфильтровав по creditTitle */
  findAll(creditTitle?: string): Credit[] {
    const credits = this.fileService.read();

    if (creditTitle) {
      // регистронезависимый поиск по creditTitle
      return credits.filter((s) =>
        s.creditTitle.toLowerCase().includes(creditTitle.toLowerCase()),
      );
    }
    return credits;
  }

  /** Получить карточку по ID */
  findOne(id: number): Credit {
    const credit = this.fileService.read().find((s) => s.id === id);
    if (!credit) {
      throw new NotFoundException(`Карточка с id=${id} не найдена`);
    }
    return credit;
  }

  /** Создать новую карточку */
  create(dto: CreateCreditDto): Credit {
    const credits = this.fileService.read();

    // проверим на дубликат по creditTitle
    if (credits.some((s) => s.creditTitle === dto.creditTitle)) {
      throw new BadRequestException(
        `Карточка с creditTitle='${dto.creditTitle}' уже существует`,
      );
    }

    const newId = credits.length > 0 ? Math.max(...credits.map((s) => s.id)) + 1 : 1;
    const credit = { ...dto, id: newId };

    this.fileService.add(credit);
    return credit;
  }

  /** Обновить карточку */
  update(id: number, dto: UpdateCreditDto): Credit {
    const credits = this.fileService.read();
    const idx = credits.findIndex((s) => s.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Карточка с id=${id} не найдена`);
    }

    const updated = { ...credits[idx], ...dto };
    credits[idx] = updated;
    this.fileService.write(credits);
    return updated;
  }

  /** Удалить карточку */
  remove(id: number): void {
    const credits = this.fileService.read();
    const exists = credits.some((s) => s.id === id);

    if (!exists) {
      throw new NotFoundException(`Карточка с id=${id} не найдена`);
    }

    this.fileService.write(credits.filter((s) => s.id !== id));
  }
}
