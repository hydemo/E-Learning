import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateScoreDTO {
  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'scene' })
  readonly scene: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'prompt' })
  readonly prompt: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'model' })
  readonly LLM_type: string;
}
