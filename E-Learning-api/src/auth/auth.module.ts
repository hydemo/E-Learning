import { Module } from '@nestjs/common';
import { AdminModule } from 'src/module/admin/admin.module';

import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  providers: [AuthService, AuthStrategy],
  imports: [AdminModule],
})
export class AuthModule {}
