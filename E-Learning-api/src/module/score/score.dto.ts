import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';

export class CreateScoreDTO {
  @IsMongoId()
  @Type(() => String)
  @ApiProperty({ description: 'systemPromptId' })
  readonly systemPrompt: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'prompt' })
  readonly prompt: string;
}
