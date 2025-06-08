import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { endOfMonth } from 'date-fns';
import { UpsertBudgetDto } from './dto/upsert-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async upsert(userId: string, dto: UpsertBudgetDto) {
    try {
      await this.prisma.budget.upsert({
        where: {
          userId_year_month: {
            userId,
            year: dto.year,
            month: dto.month,
          },
        },
        update: { amount: dto.amount },
        create: {
          userId,
          year: dto.year,
          month: dto.month,
          amount: dto.amount,
        },
      });
    } catch (error) {
      // 예외 발생 시 NestJS 예외로 변환
      throw new InternalServerErrorException(
        `예산 정보를 저장하는 데 실패했습니다. ${error}`,
      );
    }
  }
  async getStatus(userId: string, year: number, month: number) {
    const start = new Date(`${year}-${String(month).padStart(2, '0')}-01`);
    const end = endOfMonth(start);

    const budget = await this.prisma.budget.findUnique({
      where: {
        userId_year_month: {
          userId,
          year: Number(year),
          month: Number(month),
        },
      },
    });

    const expenses = await this.prisma.expense.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        expenseDate: { gte: start, lte: end },
      },
    });

    const budgetAmount = budget?.amount ?? 0;
    const spent = expenses._sum.amount ?? 0;

    return {
      year,
      month,
      hasBudget: !!budget, // ✅ 예산 존재 여부
      budget: budgetAmount,
      spent,
      remaining: budgetAmount - spent,
    };
  }
}
