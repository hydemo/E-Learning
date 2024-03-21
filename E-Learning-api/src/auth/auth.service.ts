import { Inject } from '@nestjs/common';
import { AdminService } from 'src/module/admin/admin.service';

export class AuthService {
  constructor(@Inject(AdminService) private readonly adminService: AdminService) {}

  async validateUser(payload: { type: string; id: string; isMock: boolean }): Promise<any> {
    if (payload.type === 'user') {
      // const user = await this.userService.findById(payload.id);
      // return { ...user, isMock: payload.isMock };
    } else if (payload.type === 'admin') {
      return await this.adminService.findById(payload.id);
    }
  }
}
