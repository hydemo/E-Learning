import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OptimizeQuestions, OptimizeQuestionsSchema } from './optimizeQuestions.schema';
import { OptimizeQuestionsService } from './optimizeQuestions.service';

@Module({
  providers: [OptimizeQuestionsService],
  exports: [OptimizeQuestionsService],
  imports: [MongooseModule.forFeature([{ name: OptimizeQuestions.name, schema: OptimizeQuestionsSchema }])],
})
export class OptimizeQuestionsModule {}
