import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // ✅ 꼭 export 해야 다른 모듈에서 사용 가능
})
export class UsersModule {}
