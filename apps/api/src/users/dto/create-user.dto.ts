import { IsNonEmptyString } from '../../validate-decorators';

export class CreateUserDto {
  @IsNonEmptyString()
  id: string;
  @IsNonEmptyString()
  name: string;
  @IsNonEmptyString()
  email: string;
  @IsNonEmptyString()
  phone: string;
}
