import { Controller, Get, Body, Query, UseGuards, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

import { BudgetsService } from './budget.service';

import { getUser } from 'src/users/users.decorator';
import { UpsertBudgetDto } from './dto/upsert-budget.dto';
import { AuthUser } from '@repo/types';

@ApiTags('Budget (예산 관련 API)')
@Controller('budget')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') // 👈 위에서 설정한 name과 일치해야 함
  @Get('status')
  @ApiQuery({
    name: 'year',
    type: Number,
    required: true,
    description: '연도 (예: 2025)',
  })
  @ApiQuery({
    name: 'month',
    type: Number,
    required: true,
    description: '월 (1~12)',
  })
  @ApiOperation({
    summary: '월별 예산 현황 조회',
    description: '해당 연/월의 예산과 실제 지출을 확인합니다.',
  })
  async getStatus(
    @getUser() user: AuthUser,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.budgetsService.getStatus(user.id, year, month);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '월별 예산 설정',
    description: '특정 연/월의 예산을 생성 또는 수정합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['year', 'month', 'amount'],
      properties: {
        year: {
          type: 'integer',
          example: 2025,
          description: '년 (예: 2025)',
        },
        month: {
          type: 'integer',
          example: 6,
          description: '월 (1~12)',
        },

        amount: {
          type: 'integer',
          example: 100000,
          description: '예산 금액 (원 단위)',
        },
      },
    },
  })
  upsertBudget(@getUser() user: AuthUser, @Body() dto: UpsertBudgetDto) {
    return this.budgetsService.upsert(user.id, dto);
  }
}
