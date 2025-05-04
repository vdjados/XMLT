import { IsString, IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateStockDto {
  @IsUrl({}, { message: 'src должно быть корректным URL' })
  src: string;

  @IsString()
  @IsNotEmpty({ message: 'title не может быть пустым' })
  @Length(3, 50, { message: 'title должен быть от 3 до 50 символов' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'text не может быть пустым' })
  text: string;
}