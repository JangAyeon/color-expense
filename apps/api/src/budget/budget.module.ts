import { Module } from '@nestjs/common';
import { BudgetsService } from './budget.service';
import { BudgetsController } from './budget.controller';

@Module({
  providers: [BudgetsService],
  controllers: [BudgetsController],
  exports: [BudgetsService], // ✅ 꼭 export 해야 다른 모듈에서 사용 가능
})
export class BudgetsModule {}
