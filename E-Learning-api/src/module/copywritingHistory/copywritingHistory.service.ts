import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { ApiErrorCode } from 'src/common/enum/api-error-code.enum';
import { ApiException } from 'src/common/exception/api.exception';

import { ICopywriting } from '../copywriting/copywriting.schema';
import { CopywritingService } from '../copywriting/copywriting.service';

import { CreateCopywritingHistoryDTO } from './copywritingHistory.dto';
import { ICopywritingHistory, CopywritingHistory } from './copywritingHistory.schema';

@Injectable()
export class CopywritingHistoryService {
  constructor(
    @InjectModel(CopywritingHistory.name) private readonly copywritingHistoryModel: Model<ICopywritingHistory>,
    @Inject(CopywritingService) private readonly copywritingService: CopywritingService,
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
    const data = await this.copywritingHistoryModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.pageSize)
      .skip((pagination.current - 1) * pagination.pageSize)
      .populate({ path: 'copywriting', model: 'Copywriting' })
      .lean()
      .exec();
    const total = await this.copywritingHistoryModel.countDocuments(condition).lean().exec();
    return { data, total };
  }

  async genResult(id: string, prompt: string, copywriting: ICopywriting, res: any) {
    let result: any = '';
    const scoringCriteria: any = copywriting.scoringCriteria;
    const systemPrompt = `${copywriting.guide}${scoringCriteria?.content}${copywriting.conclusion}`;
    try {
      const response = await axios({
        method: 'post', // 根据实际情况选择 get 或 post
        url: 'http://123.125.12.71:6007/stream_direct_return/',
        // headers: options.headers,
        data: { user_prompt: prompt, system_prompt: systemPrompt, LLM_type: copywriting.LLM_type },
        responseType: 'stream',
        headers: { 'Content-Type': 'application/json', accept: 'application/json' },
      });

      response.data.on('data', (chunk) => {
        const data = chunk.toString();
        result += data;
        res.write(`${data}`);
        // 每次接收到数据块时执行的操作
      });

      response.data.on('end', async () => {
        await this.copywritingHistoryModel.findByIdAndUpdate(id, { result });
        console.log('\nStream ended.');
        res.end();
      });

      response.data.on('error', (error) => {
        console.error('Stream error:', error);
      });
      return response;
    } catch (error) {
      console.error('Request error:', error);
    }
  }

  async create(copywritingHistory: CreateCopywritingHistoryDTO, res: any) {
    const newCopywritingHistory = await this.copywritingHistoryModel.create(copywritingHistory);
    const copywriting = await this.copywritingService.findByScene(copywritingHistory.scene);
    if (!copywriting) {
      throw new ApiException('代写不存在', ApiErrorCode.NO_EXIST, 404);
    }
    return await this.genResult(newCopywritingHistory._id, copywritingHistory.prompt, copywriting, res);
  }

  async update(id: string, res: any) {
    const copywritingHistory = await this.copywritingHistoryModel.findById(id);
    if (!copywritingHistory) {
      throw new ApiException('记录不存在', ApiErrorCode.NO_EXIST, 404);
    }
    const copywriting = await this.copywritingService.detail(copywritingHistory.copywriting);
    if (!copywriting) {
      throw new ApiException('代写不存在', ApiErrorCode.NO_EXIST, 404);
    }
    return await this.genResult(id, copywritingHistory.prompt, copywriting, res);
  }
}
