import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCopywritingDTO } from './copywriting.dto';
import { ICopywriting, Copywriting } from './copywriting.schema';

@Injectable()
export class CopywritingService {
  constructor(@InjectModel(Copywriting.name) private readonly copywritingModel: Model<ICopywriting>) {}

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
    const data = await this.copywritingModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.pageSize)
      .skip((pagination.current - 1) * pagination.pageSize)
      .populate({ path: 'scoringCriteria', model: 'ScoringCriteria' })
      .lean()
      .exec();
    const total = await this.copywritingModel.countDocuments(condition).lean().exec();
    return { data, total };
  }

  async detail(copywritingId: string) {
    return await this.copywritingModel
      .findById(copywritingId)
      .populate({ path: 'scoringCriteria', model: 'ScoringCriteria' });
  }

  async create(copywriting: CreateCopywritingDTO) {
    await this.copywritingModel.create(copywriting);
  }

  async update(id: string, copywriting: CreateCopywritingDTO) {
    await this.copywritingModel.findByIdAndUpdate(id, copywriting);
  }

  async delete(id: string) {
    await this.copywritingModel.findByIdAndUpdate(id, { isDelete: true });
  }

  async findByScene(scene: string) {
    return await this.copywritingModel.findOne({ scene });
  }
}
