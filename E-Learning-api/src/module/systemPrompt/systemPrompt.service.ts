import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSystemPromptDTO } from './systemPrompt.dto';
import { ISystemPrompt, SystemPrompt } from './systemPrompt.schema';

@Injectable()
export class SystemPromptService {
  constructor(@InjectModel(SystemPrompt.name) private readonly systemPromptModel: Model<ISystemPrompt>) {}

  // 获取全部信息
  async list(pagination: any) {
    const condition: any = { isDelete: false };
    const searchCondition = [];
    if (pagination.name) {
      searchCondition.push({ name: new RegExp(pagination.name, 'i') });
    }
    if (pagination.prompt) {
      searchCondition.push({ prompt: new RegExp(pagination.prompt, 'i') });
    }
    if (searchCondition.length) {
      condition.$or = searchCondition;
    }
    const data = await this.systemPromptModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.pageSize)
      .skip((pagination.current - 1) * pagination.pageSize)
      .lean()
      .exec();
    const total = await this.systemPromptModel.countDocuments(condition).lean().exec();
    return { data, total };
  }

  async create(systemPrompt: CreateSystemPromptDTO) {
    await this.systemPromptModel.create(systemPrompt);
  }

  async getSystemPromptsName(name: string) {
    return await this.systemPromptModel.find({ name });
  }

  async detail(systemPromptId: string) {
    return await this.systemPromptModel.findById(systemPromptId);
  }

  async update(id: string, systemPrompt: CreateSystemPromptDTO) {
    await this.systemPromptModel.findByIdAndUpdate(id, systemPrompt);
  }

  async delete(id: string) {
    await this.systemPromptModel.findByIdAndUpdate(id, { isDelete: true });
  }
}
