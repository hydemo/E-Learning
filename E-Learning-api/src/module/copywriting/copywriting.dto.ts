import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';

export class CreateCopywritingDTO {
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
  @ApiProperty({ description: 'keyword' })
  readonly keyword: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'scene' })
  readonly scene: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'LLM_type' })
  readonly LLM_type: string;
}
