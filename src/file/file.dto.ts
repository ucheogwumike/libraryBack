import { IsOptional, IsString } from 'class-validator';

export class UpdateYourEntityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  region?: string;
}
