import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async createExpense(
    amount: number,
    category: string,
    userId: string,
    expenseDate: string,
  ) {
    return this.prisma.expense.create({
      data: {
        amount,
        category,
        userId,
        expenseDate: new Date(expenseDate),
      },
    });
  }

  async findAllExpenseByUser(userId: string) {
    return this.prisma.expense.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findExpenseById(expneseId: string) {
    return this.prisma.expense.findUnique({
      where: { id: expneseId },
    });
  }
}
