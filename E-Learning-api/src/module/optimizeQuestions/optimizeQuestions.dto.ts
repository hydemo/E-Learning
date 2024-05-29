import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';

export class CreateOptimizeQuestionsDTO {
  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'guide' })
  readonly guide: string;

  @IsMongoId()
  @Type(() => String)
  @ApiProperty({ description: 'scoringCriteria' })
  readonly scoringCriteria: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'conclusion' })
  readonly conclusion: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'LLM_type' })
  readonly LLM_type: string;
}
