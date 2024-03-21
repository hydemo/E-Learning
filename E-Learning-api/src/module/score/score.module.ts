import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SystemPromptModule } from '../systemPrompt/systemPrompt.module';

import { Score, ScoreSchema } from './score.schema';
import { ScoreService } from './score.service';

@Module({
  providers: [ScoreService],
  exports: [ScoreService],
  imports: [MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]), SystemPromptModule],
})
export class ScoreModule {}
