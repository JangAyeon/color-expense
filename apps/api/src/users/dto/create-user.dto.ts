import { IsNonEmptyString } from 'src/validate-decorators';

export class CreateUserDto {
  @IsNonEmptyString()
  email: string;
  @IsNonEmptyString()
  phone: string;
}
