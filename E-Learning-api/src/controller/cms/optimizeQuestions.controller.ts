import { Controller, Get, Inject, Query, UseGuards, Post, Delete, Body, Put, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';
import { MongodIdPipe } from 'src/common/pipe/mongodId.pipe';
import { CreateOptimizeQuestionsDTO } from 'src/module/optimizeQuestions/optimizeQuestions.dto';
import { OptimizeQuestionsService } from 'src/module/optimizeQuestions/optimizeQuestions.service';

@ApiTags('cms/optimizeQuestions')
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('admin/optimizeQuestions')
export class CMSOptimizeQuestionsController {
  constructor(@Inject(OptimizeQuestionsService) private optimizeQuestionsService: OptimizeQuestionsService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'optimizeQuestions列表', description: 'optimizeQuestions列表' })
  async list(@Query() query: any) {
    return await this.optimizeQuestionsService.list(query);
  }

  @Post('/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '新增optimizeQuestions', description: '新增optimizeQuestions' })
  async add(@Body() optimizeQuestions: CreateOptimizeQuestionsDTO) {
    await this.optimizeQuestionsService.create(optimizeQuestions);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '修改optimizeQuestions', description: '修改optimizeQuestions' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() optimizeQuestions: CreateOptimizeQuestionsDTO) {
    await this.optimizeQuestionsService.update(id, optimizeQuestions);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '删除optimizeQuestions', description: '新增optimizeQuestions' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.optimizeQuestionsService.delete(id);
  }
}
