import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateSystemPromptDTO {
  @IsString()
  @Type(() => String)
  @ApiProperty({ description: '名称' })
  readonly name: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'prompt' })
  readonly prompt: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'scene' })
  readonly scene: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'LLM' })
  readonly LLM_type: string;

  @IsString({ each: true })
  @Type(() => String)
  @ApiProperty({ description: 'fields' })
  readonly fields: string[];
}
