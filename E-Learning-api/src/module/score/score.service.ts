import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { ApiErrorCode } from 'src/common/enum/api-error-code.enum';
import { ApiException } from 'src/common/exception/api.exception';

import { ISystemPrompt } from '../systemPrompt/systemPrompt.schema';
import { SystemPromptService } from '../systemPrompt/systemPrompt.service';

import { CreateScoreDTO } from './score.dto';
import { IScore, Score } from './score.schema';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: Model<IScore>,
    @Inject(SystemPromptService) private readonly systemPromptService: SystemPromptService,
  ) {}

  // 获取全部信息
  async list(pagination: any) {
    const condition: any = { isDelete: false };
    const searchCondition = [];
    if (pagination.status) {
      condition.status = pagination.status;
    }
    if (pagination.prompt) {
      searchCondition.push({ prompt: new RegExp(pagination.prompt, 'i') });
    }
    const data = await this.scoreModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.pageSize)
      .skip((pagination.current - 1) * pagination.pageSize)
      .populate({ path: 'systemPrompt', model: 'SystemPrompt' })
      .lean()
      .exec();
    const total = await this.scoreModel.countDocuments(condition).lean().exec();
    return { data, total };
  }

  async detail(scoreId: string) {
    return await this.scoreModel.findById(scoreId);
  }

  async sleep(timeout: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, timeout);
    });
  }

  async getDescription(request_id: string, fields: string[]) {
    let count = 0;
    while (count < 5) {
      await this.sleep(5000);
      try {
        const res: any = await axios({
          method: 'GET',
          url: 'http://218.249.15.154:6007/get_reason/',
          params: {
            request_id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const details = res.data?.details || [];
        const result: any = {};
        details.forEach((item: any) => {
          result[item.field] = item.description;
        });
        const isFinish = fields.every((item) => result[`${item}得分理由`]);
        if (isFinish) {
          return result;
        }
        count++;
      } catch (error) {
        count++;
      }
    }
    return 'Error';
  }

  async getScore(request_id: string, fields: string[]) {
    let count = 0;
    while (count < 5) {
      try {
        await this.sleep(5000);
        const res: any = await axios({
          method: 'GET',
          url: 'http://218.249.15.154:6007/get_score/',
          params: {
            request_id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const details = res.data?.details || [];
        const result: any = {};
        details.forEach((item: any) => {
          result[item.field] = item.score;
        });
        const isFinish =
          fields.every((item) => result[`${item}得分`] || result[`${item}得分`] === 0) && res.data?.total_score;

        if (isFinish) {
          result.total_score = res.data.total_score;
          return result;
        }
        count++;
      } catch (error) {
        count++;
      }
    }
    return 'Error';
  }

  async getResult(request_id: string, score: IScore, fields: string[]) {
    const scoreResult = await this.getScore(request_id, fields);
    const descriptionResult = await this.getDescription(request_id, fields);
    if (scoreResult === 'Error' || descriptionResult === 'Error') {
      await this.scoreModel.findByIdAndUpdate(score._id, { status: 2 });
      return;
    }
    const result = fields.map((item) => {
      return {
        field: item,
        score: scoreResult[`${item}得分`],
        description: descriptionResult[`${item}得分理由`],
      };
    });
    await this.scoreModel.findByIdAndUpdate(score._id, { totalScore: scoreResult.total_score, result, status: 1 });
  }

  async score(score: IScore, systemPrompt: ISystemPrompt) {
    try {
      const res: any = await axios({
        url: 'http://218.249.15.154:6007/system_prompt_score/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          system_prompt_name: systemPrompt.name,
          system_prompt: systemPrompt.prompt,
          system_prompt_fields: systemPrompt.fields.join('#'),
          user_prompt: score.prompt,
        },
      });
      this.getResult(res.data?.request_id, score, systemPrompt.fields);
    } catch (error) {
      await this.scoreModel.findByIdAndUpdate(score._id, { status: 2 });
    }
  }

  async create(score: CreateScoreDTO) {
    const systemPrompt = await this.systemPromptService.detail(score.systemPrompt);
    if (!systemPrompt) {
      throw new ApiException('系统Prompt不存在', ApiErrorCode.NO_EXIST, 404);
    }
    const newScore = await this.scoreModel.create(score);
    await this.score(newScore, systemPrompt);
    return { scoreId: newScore._id };
  }

  async refresh(id: string) {
    const score = await this.scoreModel.findByIdAndUpdate(id, { status: 0 });
    if (!score) {
      throw new ApiException('评分结果不存在不存在', ApiErrorCode.NO_EXIST, 404);
    }
    const systemPrompt = await this.systemPromptService.detail(score.systemPrompt);
    await this.score(score, systemPrompt);
  }
}
