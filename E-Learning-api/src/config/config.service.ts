import * as fs from 'fs';

import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { RedisModuleOptions } from 'nest-redis';

export interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string(),

      PORT: Joi.number().default(8000),

      NAME: Joi.string(),

      DATABASE_TYPE: Joi.string().default('mongodb'),

      DATABASE_HOST: Joi.string().default('localhost'),

      DATABASE_PORT: Joi.number().default(27017),

      DATABASE_USER: Joi.string().default('root'),

      DATABASE_PWD: Joi.string(),

      DATABASE_NAME: Joi.string().required(),

      REDIS_HOST: Joi.string().required(),

      REDIS_PORT: Joi.number().default(6379),

      REDIS_DB: Joi.number().default(10),

      REDIS_PASS: Joi.string().required(),

      REDIS_KEYPREFIX: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get env(): string {
    return this.envConfig.NODE_ENV;
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get name(): string {
    return this.envConfig.NAME;
  }

  get databaseName(): string {
    return this.envConfig.DATABASE_DB;
  }

  get redis(): RedisModuleOptions {
    return {
      host: this.envConfig.REDIS_HOST,
      port: Number(this.envConfig.REDIS_PORT),
      db: Number(this.envConfig.REDIS_DB),
      password: this.envConfig.REDIS_PASS,
      keyPrefix: this.envConfig.REDIS_KEYPREFIX,
    };
  }

  get mongodb(): MongooseModuleOptions {
    return {
      uri:
        `mongodb://${this.envConfig.DATABASE_USER}:${this.envConfig.DATABASE_PWD}` +
        `@${this.envConfig.DATABASE_HOST}:${this.envConfig.DATABASE_PORT}/${this.envConfig.DATABASE_NAME}`,
    };
  }
}
