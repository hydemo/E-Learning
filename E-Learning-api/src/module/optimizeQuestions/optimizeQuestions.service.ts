import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOptimizeQuestionsDTO } from './optimizeQuestions.dto';
import { IOptimizeQuestions, OptimizeQuestions } from './optimizeQuestions.schema';

@Injectable()
export class OptimizeQuestionsService {
  constructor(
    @InjectModel(OptimizeQuestions.name) private readonly optimizeQuestionsModel: Model<IOptimizeQuestions>,
  ) {}

  // 获取全部信息
  async list(pagination: any) {
    const condition: any = { isDelete: false };
    const searchCondition = [];
    if (pagination.content) {
      searchCondition.push({ content: new RegExp(pagination.content, 'i') });
    }
    if (pagination.name) {
      searchCondition.push({ name: new RegExp(pagination.name, 'i') });
    }
    const data = await this.optimizeQuestionsModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.pageSize)
      .skip((pagination.current - 1) * pagination.pageSize)
      .populate({ path: 'scoringCriteria', model: 'ScoringCriteria' })
      .lean()
      .exec();
    const total = await this.optimizeQuestionsModel.countDocuments(condition).lean().exec();
    return { data, total };
  }

  async detail(optimizeQuestionsId: string) {
    return await this.optimizeQuestionsModel.findById(optimizeQuestionsId);
  }

  async create(optimizeQuestions: CreateOptimizeQuestionsDTO) {
    await this.optimizeQuestionsModel.create(optimizeQuestions);
  }

  async update(id: string, optimizeQuestions: CreateOptimizeQuestionsDTO) {
    await this.optimizeQuestionsModel.findByIdAndUpdate(id, optimizeQuestions);
  }

  async delete(id: string) {
    await this.optimizeQuestionsModel.findByIdAndUpdate(id, { isDelete: true });
  }
}
