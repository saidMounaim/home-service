import { Category } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AddBusinessDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  contactPerson: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsEnum(Category, { message: 'Category must be a valid enum value' })
  @IsNotEmpty()
  category: Category;
}
