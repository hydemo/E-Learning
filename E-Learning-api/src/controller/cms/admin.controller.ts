import { Body, Controller, Post, UseGuards, Inject, Request, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';
import { LoginDTO, NewPassDTO } from 'src/module/admin/admin.dto';
import { AdminService } from 'src/module/admin/admin.service';

@ApiTags('admin/users')
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('admin')
export class CMSAdminController {
  constructor(@Inject(AdminService) private adminService: AdminService) {}
  @Post('/login')
  @ApiOkResponse({
    description: '登录成功',
  })
  @ApiOperation({ summary: '登录', description: '登录' })
  async login(@Body() login: LoginDTO, @Request() req): Promise<any> {
    const clientIp = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    return await this.adminService.login(login.username, login.password, clientIp);
  }

  @UseGuards(AuthGuard())
  @Put('/resetPass')
  @ApiOkResponse({
    description: '修改密码',
  })
  @ApiOperation({ summary: '修改密码', description: '修改密码' })
  async resetPass(@Request() req, @Body() reset: NewPassDTO): Promise<any> {
    return await this.adminService.resetNewPassword(req.user._id, reset);
  }
}
