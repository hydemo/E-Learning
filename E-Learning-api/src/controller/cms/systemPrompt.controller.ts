import { Controller, Get, Inject, Query, UseGuards, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';
import { MongodIdPipe } from 'src/common/pipe/mongodId.pipe';
import { CreateSystemPromptDTO } from 'src/module/systemPrompt/systemPrompt.dto';
import { SystemPromptService } from 'src/module/systemPrompt/systemPrompt.service';

@ApiTags('cms/systemPrompts')
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('admin/systemPrompts')
export class CMSSystemPromptController {
  constructor(@Inject(SystemPromptService) private systemPromptService: SystemPromptService) {}

  @Get('/')
  @ApiOperation({ summary: 'systemPrompt列表', description: 'systemPrompt列表' })
  async list(@Query() query: any) {
    return await this.systemPromptService.list(query);
  }

  @Get('/name')
  @ApiOperation({ summary: 'systemPrompt详情', description: 'systemPrompt详情' })
  async getSystemPromptByName(@Query('name') name: string) {
    return await this.systemPromptService.getSystemPromptsName(name);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'systemPrompt详情', description: 'systemPrompt详情' })
  async detail(@Param('id', new MongodIdPipe()) id: string) {
    return await this.systemPromptService.detail(id);
  }

  @Post('/')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '新增systemPrompt', description: '新增systemPrompt' })
  async add(@Body() systemPrompt: CreateSystemPromptDTO) {
    await this.systemPromptService.create(systemPrompt);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '修改systemPrompt', description: '新增systemPrompt' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() systemPrompt: CreateSystemPromptDTO) {
    await this.systemPromptService.update(id, systemPrompt);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '删除systemPrompt', description: '新增systemPrompt' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.systemPromptService.delete(id);
  }
}
