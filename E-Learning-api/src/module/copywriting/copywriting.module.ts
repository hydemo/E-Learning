import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Copywriting, CopywritingSchema } from './copywriting.schema';
import { CopywritingService } from './copywriting.service';

@Module({
  providers: [CopywritingService],
  exports: [CopywritingService],
  imports: [MongooseModule.forFeature([{ name: Copywriting.name, schema: CopywritingSchema }])],
})
export class CopywritingModule {}
