import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ScoringCriteria, ScoringCriteriaSchema } from './scoringCriteria.schema';
import { ScoringCriteriaService } from './scoringCriteria.service';

@Module({
  providers: [ScoringCriteriaService],
  exports: [ScoringCriteriaService],
  imports: [MongooseModule.forFeature([{ name: ScoringCriteria.name, schema: ScoringCriteriaSchema }])],
})
export class ScoringCriteriaModule {}
