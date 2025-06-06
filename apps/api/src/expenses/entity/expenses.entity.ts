import { ApiProperty } from '@nestjs/swagger';

export class ExpensesEntity {
  @ApiProperty({ example: 'ckvxyz789def123' })
  id: string;

  @ApiProperty({ example: 10000 })
  amount: number;

  @ApiProperty({ example: 'Transportation' })
  category: string;

  @ApiProperty({ example: 'ckvxyz123abc456' })
  userId: string;

  @ApiProperty({ example: '2025-06-07T12:00:00Z' })
  createdAt: Date;
}
