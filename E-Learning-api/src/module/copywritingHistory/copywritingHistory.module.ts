import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CopywritingModule } from '../copywriting/copywriting.module';

import { CopywritingHistory, CopywritingHistorySchema } from './copywritingHistory.schema';
import { CopywritingHistoryService } from './copywritingHistory.service';

@Module({
  providers: [CopywritingHistoryService],
  exports: [CopywritingHistoryService],
  imports: [
    MongooseModule.forFeature([{ name: CopywritingHistory.name, schema: CopywritingHistorySchema }]),
    CopywritingModule,
  ],
})
export class CopywritingHistoryModule {}
