import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FileService } from '../file.service';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StocksService {
  constructor(private fileService: FileService<Stock[]>) {}

  /** Получить все карточки, опционально отфильтровав по title */
  findAll(title?: string): Stock[] {
    const stocks = this.fileService.read();

    if (title) {
      // регистронезависимый поиск по title
      return stocks.filter((s) =>
        s.title.toLowerCase().includes(title.toLowerCase()),
      );
    }
    return stocks;
  }

  /** Получить карточку по ID */
  findOne(id: number): Stock {
    const stock = this.fileService.read().find((s) => s.id === id);
    if (!stock) {
      throw new NotFoundException(`Карточка с id=${id} не найдена`);
    }
    return stock;
  }

  /** Создать новую карточку */
  create(dto: CreateStockDto): Stock {
    const stocks = this.fileService.read();

    // проверим на дубликат по title
    if (stocks.some((s) => s.title === dto.title)) {
      throw new BadRequestException(
        `Карточка с title='${dto.title}' уже существует`,
      );
    }

    const newId = stocks.length > 0 ? Math.max(...stocks.map((s) => s.id)) + 1 : 1;
    const stock = { ...dto, id: newId };

    this.fileService.add(stock);
    return stock;
  }

  /** Обновить карточку */
  update(id: number, dto: UpdateStockDto): Stock {
    const stocks = this.fileService.read();
    const idx = stocks.findIndex((s) => s.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Карточка с id=${id} не найдена`);
    }

    const updated = { ...stocks[idx], ...dto };
    stocks[idx] = updated;
    this.fileService.write(stocks);
    return updated;
  }

  /** Удалить карточку */
  remove(id: number): void {
    const stocks = this.fileService.read();
    const exists = stocks.some((s) => s.id === id);

    if (!exists) {
      throw new NotFoundException(`Карточка с id=${id} не найдена`);
    }

    this.fileService.write(stocks.filter((s) => s.id !== id));
  }
}
