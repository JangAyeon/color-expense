import { IsNonEmptyString } from 'src/validate-decorators';

export class CreateUserDto {
  @IsNonEmptyString()
  name: string;
  @IsNonEmptyString()
  email: string;
  @IsNonEmptyString()
  phone: string;
}
