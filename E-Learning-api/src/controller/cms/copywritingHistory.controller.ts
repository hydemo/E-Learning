import { Controller, Get, Inject, Query, UseGuards, Post, Put, Body, Param, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';
import { MongodIdPipe } from 'src/common/pipe/mongodId.pipe';
import { CreateCopywritingHistoryDTO } from 'src/module/copywritingHistory/copywritingHistory.dto';
import { CopywritingHistoryService } from 'src/module/copywritingHistory/copywritingHistory.service';

@ApiTags('cms/copywritingHistory')
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('admin/copywritingHistory')
export class CMSCopywritingHistoryController {
  constructor(@Inject(CopywritingHistoryService) private copywritingHistoryService: CopywritingHistoryService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'copywritingHistory列表', description: 'copywritingHistory列表' })
  async list(@Query() query: any) {
    return await this.copywritingHistoryService.list(query);
  }

  @Post('/')
  // @UseGuards(AuthGuard())
  @ApiOperation({ summary: '新增copywritingHistory', description: '新增copywritingHistory' })
  async add(@Body() copywritingHistory: CreateCopywritingHistoryDTO, @Response() res: any) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    await this.copywritingHistoryService.create(copywritingHistory, res);
  }

  @Put('/:id')
  // @UseGuards(AuthGuard())
  @ApiOperation({ summary: '修改copywritingHistory', description: '修改copywritingHistory' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Response() res: any) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    return await this.copywritingHistoryService.update(id, res);
  }
}
