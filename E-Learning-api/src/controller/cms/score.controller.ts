import { Controller, Get, Inject, Query, UseGuards, Post, Body, Put, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';
import { MongodIdPipe } from 'src/common/pipe/mongodId.pipe';
import { CreateScoreDTO } from 'src/module/score/score.dto';
import { ScoreService } from 'src/module/score/score.service';

@ApiTags('cms/scores')
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('admin/scores')
export class CMSScoreController {
  constructor(@Inject(ScoreService) private scoreService: ScoreService) {}

  @Get('/')
  @ApiOperation({ summary: 'score列表', description: 'score列表' })
  async list(@Query() query: any) {
    return await this.scoreService.list(query);
  }

  @Post('/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '新增score', description: '新增score' })
  async add(@Body() score: CreateScoreDTO) {
    await this.scoreService.create(score);
  }

  @Put('/:id/refresh')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '重新评分', description: '重新评分' })
  async refresh(@Param('id', new MongodIdPipe()) id: string) {
    await this.scoreService.refresh(id);
  }
}
