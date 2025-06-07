import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users (사용자 관련 API)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*
   * POST
   */
  @Post() // createUser
  @ApiOperation({
    summary: '새로운 유저 생성하기',
    description: '새로운 유저를 생성합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'phone', 'name'],
      properties: {
        name: {
          type: 'string',
          example: '홍길동',
          description: '사용자 성명',
        },
        email: {
          type: 'string',
          example: 'user@example.com',
          description: '사용자 이메일 주소 (고유값)',
        },
        phone: {
          type: 'string',
          example: '01012345678',
          description: '사용자 전화번호 (고유값)',
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: UserEntity,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  /*
   * GET
   */

  @Get('/search') // findUserByEmail findUserByPhone
  @ApiOperation({
    summary: '이메일 또는 전화번호로 유저 검색하기',
    description:
      '이메일 또는 전화번호를 기준으로 유저를 검색합니다. 두 값 중 하나만 전달해야 합니다.',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: '검색할 유저의 이메일 주소',
  })
  @ApiQuery({
    name: 'phone',
    required: false,
    type: String,
    description: '검색할 유저의 전화번호',
  })
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: '유저를 찾을 수 없습니다' })
  findUserByEmailOrPhone(
    @Query('email') email?: string,
    @Query('phone') phone?: string,
  ) {
    console.log('###', email, phone);
    if (email && phone) {
      throw new BadRequestException(
        'email 또는 phone 중 하나만 전달해야 합니다.',
      );
    }
    if (email) {
      return this.usersService.findUserByEmail(email);
    }
    if (phone) {
      return this.usersService.findUserByPhone(phone);
    }
    throw new BadRequestException(
      'email 또는 phone 중 하나를 전달해야 합니다.',
    );
  }
  @Get(':id') // findUserById
  @ApiOperation({
    summary: '특정 유저 불러오기',
    description: 'id를 기준으로 특정 유저의 정보를 불러옵니다',
  })
  @ApiParam({
    name: 'id',
    description: '정보를 불러오려는 유저의 id',
    type: String,
  })
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: '{id} 유저는 존재하지 않습니다',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }
  @Get() // findAllUser
  @ApiOperation({
    summary: '모든 유저 불러오기',
    description: '데이터베이스에 저장되어있는 모든 유저를 불러옵니다.',
  })
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAllUser();
  }
  // updateUser
  /*
   * PATCH
   */
  @Patch(':id')
  @ApiOperation({
    summary: '유저 정보 수정하기',
    description: '특정 유저의 정보를 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '정보를 수정하려는 유저의 아이디',
    type: String,
  })
  @ApiBody({
    schema: {
      type: 'object',

      properties: {
        name: {
          type: 'string',
          example: '홍길동',
          description: '사용자 성명',
        },
        email: {
          type: 'string',
          example: 'user@example.com',
          description: '사용자 이메일 주소 (고유값)',
        },
        phone: {
          type: 'string',
          example: '01012345678',
          description: '사용자 전화번호 (고유값)',
        },
      },
    },
  })
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiNotFoundResponse()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
  /*
   * DELETE
   */
  @Delete(':id') // removeUser
  @ApiOperation({
    summary: '유저 삭제하기',
    description:
      '특정 유저를 삭제합니다. (주의! 유저에 달린 소비 기록도 함께 삭제됩니다)',
  })
  @ApiParam({
    name: 'id',
    description: '삭제하려는 유저의 아이디',
    type: String,
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  delete(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
