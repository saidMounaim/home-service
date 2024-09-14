import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class MakeAppointmentDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  @IsString()
  timeSlot: string;
  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsNotEmpty()
  businessId: string;
}
