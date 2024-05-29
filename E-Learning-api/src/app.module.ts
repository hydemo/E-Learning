import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from 'nest-redis';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CMSAdminController } from './controller/cms/admin.controller';
import { CMSCopywritingController } from './controller/cms/copywriting.controller';
import { CMSCopywritingHistoryController } from './controller/cms/copywritingHistory.controller';
import { CMSOptimizeQuestionsController } from './controller/cms/optimizeQuestions.controller';
import { CMSScoreController } from './controller/cms/score.controller';
import { CMSScoringCriteriaController } from './controller/cms/scoringCriteria.controller';
import { CMSSystemPromptController } from './controller/cms/systemPrompt.controller';
import { InitModule } from './init/init.module';
import { AdminModule } from './module/admin/admin.module';
import { CopywritingModule } from './module/copywriting/copywriting.module';
import { CopywritingHistoryModule } from './module/copywritingHistory/copywritingHistory.module';
import { OptimizeQuestionsModule } from './module/optimizeQuestions/optimizeQuestions.module';
import { ScoreModule } from './module/score/score.module';
import { ScoringCriteriaModule } from './module/scoringCriteria/scoringCriteria.module';
import { SystemPromptModule } from './module/systemPrompt/systemPrompt.module';
import { CryptoUtil } from './utils/crypto.util';

@Module({
  imports: [
    AuthModule,
    InitModule,
    AdminModule,
    ConfigModule,
    ScoreModule,
    SystemPromptModule,
    ScoringCriteriaModule,
    OptimizeQuestionsModule,
    CopywritingModule,
    CopywritingHistoryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.redis,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.mongodb,
      inject: [ConfigService],
    }),
  ],
  providers: [CryptoUtil],
  controllers: [
    CMSAdminController,
    CMSSystemPromptController,
    CMSScoreController,
    CMSScoringCriteriaController,
    CMSOptimizeQuestionsController,
    CMSCopywritingController,
    CMSCopywritingHistoryController,
  ],
})
export class AppModule {}
