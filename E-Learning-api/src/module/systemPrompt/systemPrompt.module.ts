import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SystemPrompt, SystemPromptSchema } from './systemPrompt.schema';
import { SystemPromptService } from './systemPrompt.service';

@Module({
  providers: [SystemPromptService],
  exports: [SystemPromptService],
  imports: [MongooseModule.forFeature([{ name: SystemPrompt.name, schema: SystemPromptSchema }])],
})
export class SystemPromptModule {}
