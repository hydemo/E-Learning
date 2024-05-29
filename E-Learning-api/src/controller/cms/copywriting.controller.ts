import { Controller, Get, Inject, Query, UseGuards, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';
import { MongodIdPipe } from 'src/common/pipe/mongodId.pipe';
import { CreateCopywritingDTO } from 'src/module/copywriting/copywriting.dto';
import { CopywritingService } from 'src/module/copywriting/copywriting.service';

@ApiTags('cms/copywriting')
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('admin/copywriting')
export class CMSCopywritingController {
  constructor(@Inject(CopywritingService) private copywritingService: CopywritingService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'copywriting列表', description: 'copywriting列表' })
  async list(@Query() query: any) {
    return await this.copywritingService.list(query);
  }

  @Post('/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '新增copywriting', description: '新增copywriting' })
  async add(@Body() copywriting: CreateCopywritingDTO) {
    await this.copywritingService.create(copywriting);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '修改copywriting', description: '修改copywriting' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() copywriting: CreateCopywritingDTO) {
    await this.copywritingService.update(id, copywriting);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '删除copywriting', description: '新增copywriting' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.copywritingService.delete(id);
  }
}
