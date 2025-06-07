import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExpensesEntity } from './entity/expenses.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { getUser, AuthUser } from 'src/users/users.decorator';
import { CreateExpensesDto } from './dto/create-expenses.dto';
import { UpdateExpensesDto } from './dto/update-expenses.dto';

@ApiTags('Expense (지출 관련 API)')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  // ✅ 지출 생성
  /*
   * POST
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') // 👈 위에서 설정한 name과 일치해야 함
  @Post()
  @ApiOperation({
    summary: '새로운 지출 생성하기',
    description: '새로운 지출을 생성합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['amount', 'category', 'expenseDate'],
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
    @getUser() user: AuthUser,
    @Body() createExpensesDto: CreateExpensesDto,
  ) {
    return this.expensesService.createExpense(user.id, createExpensesDto);
  }

  // ✅ 사용자 지출 전체 조회
  /*
   * GET
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({
    summary: '요청한 유저의 전체 지출 내역 검색하기',
    description: '요청한 유저를 기준으로 지출 내역 검색합니다.',
  })
  // @ApiQuery({
  //   name: 'userId',
  //   required: false,
  //   type: String,
  //   description: '검색할 지출내역의 userId',
  // })
  // @ApiQuery({
  //   name: 'expenseId',
  //   required: false,
  //   type: String,
  //   description: '검색할 지출 내역의 고유 id',
  // })
  @ApiOkResponse({ type: ExpensesEntity })
  @ApiNotFoundResponse({
    description: '해댱 유저의 지출 내역를 찾을 수 없습니다',
  })
  getMyExpenses(@getUser() user: AuthUser) {
    return this.expensesService.getExpensesByUser(user.id);
  }

  // ✅ 지출 수정
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch(':id')
  @ApiOperation({
    summary: '요청한 본인 유저의 특정 지출 내역 수정하기',
    description: '요청한 본인 유저의 특정 지출 내역 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    required: false,
    type: String,
    description: '수정할 지출 내역의 고유 id',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['amount', 'category', 'expenseDate'],
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

        expenseDate: {
          type: 'string',
          format: 'date-time',
          example: '2025-06-07T00:00:00.000Z',
          description: '지출이 발생한 날짜 (ISO 8601 형식)',
        },
      },
    },
  })
  @ApiOkResponse({
    type: ExpensesEntity,
  })
  @ApiNotFoundResponse()
  updateExpense(
    @getUser() user: AuthUser,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateExpensesDto,
  ) {
    const userId = user.id;
    return this.expensesService.updateExpense(userId, id, updateUserDto);
  }

  // ✅ 지출 삭제
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '요청한 본인 유저의 특정 지출 내역 삭제하기',
    description: '요청한 본인 유저의 특정 지출 내역 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    required: false,
    type: String,
    description: '삭제할 지출 내역의 고유 id',
  })
  @Delete(':id')
  deleteExpense(@getUser() user: AuthUser, @Param('id') id: string) {
    return this.expensesService.deleteExpense(user.id, id);
  }
}
