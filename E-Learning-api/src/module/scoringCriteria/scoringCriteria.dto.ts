import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateScoringCriteriaDTO {
  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'name' })
  readonly name: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'content' })
  readonly content: string;
}
