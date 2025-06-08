import { IsInt, Min, Max } from 'class-validator';

export class UpsertBudgetDto {
  @IsInt()
  year: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  amount: number;
}
