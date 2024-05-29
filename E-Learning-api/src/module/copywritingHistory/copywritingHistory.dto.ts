import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';

export class CreateCopywritingHistoryDTO {
  @IsString()
  @Type(() => String)
  @ApiProperty({ description: 'prompt' })
  readonly prompt: string;

  @IsMongoId()
  @Type(() => String)
  @ApiProperty({ description: 'copywriting' })
  readonly copywriting: string;
}
