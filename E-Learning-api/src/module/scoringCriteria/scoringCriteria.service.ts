import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiErrorCode } from 'src/common/enum/api-error-code.enum';
import { ApiException } from 'src/common/exception/api.exception';

import { CreateScoringCriteriaDTO } from './scoringCriteria.dto';
import { IScoringCriteria, ScoringCriteria } from './scoringCriteria.schema';

@Injectable()
export class ScoringCriteriaService {
  constructor(@InjectModel(ScoringCriteria.name) private readonly scoringCriteriaModel: Model<IScoringCriteria>) {}

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
    const data = await this.scoringCriteriaModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.pageSize)
      .skip((pagination.current - 1) * pagination.pageSize)
      .lean()
      .exec();
    const total = await this.scoringCriteriaModel.countDocuments(condition).lean().exec();
    return { data, total };
  }

  async detail(scoringCriteriaId: string) {
    return await this.scoringCriteriaModel.findById(scoringCriteriaId);
  }

  async create(scoringCriteria: CreateScoringCriteriaDTO) {
    const exist = await this.scoringCriteriaModel.find({ name: scoringCriteria.name });
    if (!exist) {
      throw new ApiException(`${scoringCriteria.name}已经存在`, ApiErrorCode.NO_EXIST, 404);
    }
    await this.scoringCriteriaModel.create(scoringCriteria);
  }

  async update(id: string, scoringCriteria: CreateScoringCriteriaDTO) {
    const exist = await this.scoringCriteriaModel.find({ name: scoringCriteria.name, _id: { $ne: id } });
    if (!exist) {
      throw new ApiException(`${scoringCriteria.name}已经存在`, ApiErrorCode.NO_EXIST, 404);
    }
    await this.scoringCriteriaModel.findByIdAndUpdate(id, scoringCriteria);
  }

  async delete(id: string) {
    await this.scoringCriteriaModel.findByIdAndUpdate(id, { isDelete: true });
  }
}
