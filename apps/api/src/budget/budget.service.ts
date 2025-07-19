import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { endOfMonth, subMonths, startOfMonth } from 'date-fns';
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
  async getHistory(
    userId: string,
    options: {
      months?: number;
      startYear?: number;
      startMonth?: number;
      endYear?: number;
      endMonth?: number;
    },
  ) {
    let startDate: Date;
    let endDate: Date;

    // 날짜 범위 결정
    if (
      options.startYear &&
      options.startMonth &&
      options.endYear &&
      options.endMonth
    ) {
      // 명시적 범위가 주어진 경우
      startDate = new Date(options.startYear, options.startMonth - 1, 1);
      endDate = new Date(options.endYear, options.endMonth - 1, 1);
    } else {
      // months 파라미터 기준으로 최근 N개월
      const now = new Date();
      endDate = new Date(now.getFullYear(), now.getMonth(), 1);
      startDate = subMonths(endDate, (options.months || 6) - 1);
    }

    // 월별 데이터 생성
    const monthsData: { year: number; month: number }[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      monthsData.push({ year, month });

      // 다음 달로 이동
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // 각 월별로 예산과 지출 데이터 조회
    const historyPromises = monthsData.map(async ({ year, month }) => {
      const monthStart = startOfMonth(new Date(year, month - 1, 1));
      const monthEnd = endOfMonth(new Date(year, month - 1, 1));

      // 해당 월의 예산 조회
      const budget = await this.prisma.budget.findUnique({
        where: {
          userId_year_month: {
            userId,
            year,
            month,
          },
        },
      });

      // 해당 월의 총 지출 조회
      const expenseSum = await this.prisma.expense.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          expenseDate: { gte: monthStart, lte: monthEnd },
        },
      });

      const budgetAmount = budget?.amount || 0;
      const spentAmount = expenseSum._sum.amount || 0;
      const remaining = budgetAmount - spentAmount;
      const hasBudget = !!budget;

      // 예산 사용률 계산
      let usagePercentage: number | null = null;
      let status: 'success' | 'warning' | 'danger' | 'none' = 'none';

      if (hasBudget && budgetAmount > 0) {
        usagePercentage = (spentAmount / budgetAmount) * 100;

        if (spentAmount > budgetAmount) {
          status = 'danger'; // 예산 초과
        } else if (usagePercentage >= 80) {
          status = 'warning'; // 80% 이상 사용
        } else {
          status = 'success'; // 예산 내 지출
        }
      } else if (spentAmount > 0) {
        status = 'none'; // 예산 없음
      }

      return {
        year,
        month,
        hasBudget,
        budget: budgetAmount,
        spent: spentAmount,
        remaining,
        usagePercentage,
        status,
      };
    });

    const history = await Promise.all(historyPromises);

    // 최신 월부터 정렬
    history.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });

    // 통계 계산
    const monthsWithBudget = history.filter((h) => h.hasBudget).length;
    const totalSpent = history.reduce((sum, h) => sum + h.spent, 0);
    const totalBudget = history
      .filter((h) => h.hasBudget)
      .reduce((sum, h) => sum + h.budget, 0);
    const averageMonthlySpending =
      history.length > 0 ? totalSpent / history.length : 0;
    const averageMonthlyBudget =
      monthsWithBudget > 0 ? totalBudget / monthsWithBudget : 0;

    // 예산 준수율 계산 (예산이 있는 월 중에서 예산 내에서 지출한 월의 비율)
    const budgetMonths = history.filter((h) => h.hasBudget);
    const compliantMonths = budgetMonths.filter((h) => h.spent <= h.budget);
    const budgetComplianceRate =
      budgetMonths.length > 0
        ? (compliantMonths.length / budgetMonths.length) * 100
        : 0;

    return {
      history,
      totalMonths: history.length,
      monthsWithBudget,
      averageMonthlySpending: Math.round(averageMonthlySpending),
      averageMonthlyBudget: Math.round(averageMonthlyBudget),
      budgetComplianceRate: Math.round(budgetComplianceRate * 10) / 10, // 소수점 1자리
    };
  }
}
