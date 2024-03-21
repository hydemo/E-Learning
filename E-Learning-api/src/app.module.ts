import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from 'nest-redis';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CMSAdminController } from './controller/cms/admin.controller';
import { CMSScoreController } from './controller/cms/score.controller';
import { CMSSystemPromptController } from './controller/cms/systemPrompt.controller';
import { InitModule } from './init/init.module';
import { AdminModule } from './module/admin/admin.module';
import { ScoreModule } from './module/score/score.module';
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
  controllers: [CMSAdminController, CMSSystemPromptController, CMSScoreController],
})
export class AppModule {}
