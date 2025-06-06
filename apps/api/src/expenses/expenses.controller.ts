import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ExpensesEntity } from './entity/expenses.entity';

@ApiTags('Expense (지출 관련 API)')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({
    summary: '새로운 지출 생성하기',
    description: '새로운 지출을 생성합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['amount', 'category', 'userId', 'expenseDate'],
      properties: {
        amount: {
          type: 'integer',
          example: 15000,
          description: '지출 금액',
        },
        category: {
          type: 'string',
          example: '식비',
          description: '지출 카테고리',
        },
        userId: {
          type: 'string',
          example: 'ckd8x1abc123456defghijk',
          description: '지출 등록 대상 유저 ID',
        },
        expenseDate: {
          type: 'string',
          format: 'date-time',
          example: '2025-06-07T00:00:00.000Z',
          description: '지출이 발생한 날짜 (ISO 8601 형식)',
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: ExpensesEntity,
  })
  create(
    @Body()
    body: {
      amount: number;
      category: string;
      userId: string;
      expenseDate: string;
    },
  ) {
    return this.expensesService.createExpense(
      body.amount,
      body.category,
      body.userId,
      body.expenseDate,
    );
  }

  @Get('/search') // findUserByEmail findUserByPhone
  @ApiOperation({
    summary: 'userId 또는 expenseId로 지출 내역 검색하기',
    description:
      'userId 또는 expenseId를 기준으로 지출 내역 검색합니다. 두 값 중 하나만 전달해야 합니다.',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    type: String,
    description: '검색할 지출내역의 userId',
  })
  @ApiQuery({
    name: 'expenseId',
    required: false,
    type: String,
    description: '검색할 지출 내역의 고유 id',
  })
  @ApiOkResponse({ type: ExpensesEntity })
  @ApiNotFoundResponse({ description: '지출 내역를 찾을 수 없습니다' })
  findUserByEmailOrPhone(
    @Query('userId') userId?: string,
    @Query('expenseId') expenseId?: string,
  ) {
    if (userId && expenseId) {
      throw new BadRequestException(
        'userId 또는 expenseId 중 하나만 전달해야 합니다.',
      );
    }
    if (userId) {
      return this.expensesService.findAllExpenseByUser(userId);
    }
    if (expenseId) {
      return this.expensesService.findExpenseById(expenseId);
    }
    throw new BadRequestException(
      'userId 또는 expenseId 중 하나를 전달해야 합니다.',
    );
  }
}
