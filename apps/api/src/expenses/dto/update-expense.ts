import { PartialType } from '@nestjs/mapped-types';
import { CreateExpensesDto } from './create-expenses';

export class UpdateUserDto extends PartialType(CreateExpensesDto) {}
