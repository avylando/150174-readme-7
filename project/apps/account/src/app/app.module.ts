import { Module } from '@nestjs/common';
import { AccountConfigModule } from '@project/account-config';

import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';

@Module({
  imports: [BlogUserModule, AuthenticationModule, AccountConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
