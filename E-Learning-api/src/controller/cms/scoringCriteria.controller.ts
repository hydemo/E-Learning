import { Controller, Get, Inject, Query, UseGuards, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';
import { MongodIdPipe } from 'src/common/pipe/mongodId.pipe';
import { CreateScoringCriteriaDTO } from 'src/module/scoringCriteria/scoringCriteria.dto';
import { ScoringCriteriaService } from 'src/module/scoringCriteria/scoringCriteria.service';

@ApiTags('cms/scoringCriteria')
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('admin/scoringCriteria')
export class CMSScoringCriteriaController {
  constructor(@Inject(ScoringCriteriaService) private scoringCriteriaService: ScoringCriteriaService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'scoringCriteria列表', description: 'scoringCriteria列表' })
  async list(@Query() query: any) {
    return await this.scoringCriteriaService.list(query);
  }

  @Post('/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '新增scoringCriteria', description: '新增scoringCriteria' })
  async add(@Body() scoringCriteria: CreateScoringCriteriaDTO) {
    await this.scoringCriteriaService.create(scoringCriteria);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '修改scoringCriteria', description: '修改scoringCriteria' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() scoringCriteria: CreateScoringCriteriaDTO) {
    await this.scoringCriteriaService.update(id, scoringCriteria);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '删除scoringCriteria', description: '新增scoringCriteria' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.scoringCriteriaService.delete(id);
  }
}
