import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCopywritingHistoryDTO {
  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'prompt' })
  readonly prompt: string;

  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'copywriting' })
  readonly scene: string;
}
