import { IsString, IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateCreditDto {
  @IsUrl({}, { message: 'src должно быть корректным URL' })
  src: string;

  @IsString()
  @IsNotEmpty({ message: 'creditTitle не может быть пустым' })
  @Length(3, 50, { message: 'creditTitle должен быть от 3 до 50 символов' })
  creditTitle: string;

  @IsString()
  @IsNotEmpty({ message: 'creditText не может быть пустым' })
  creditText: string;
}