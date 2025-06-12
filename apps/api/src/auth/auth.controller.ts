// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Authentication (인증 관련 API)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: '회원가입',
    description: '이메일과 비밀번호로 새 사용자를 등록합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'user@example.com',
          description: '사용자 이메일',
        },
        password: {
          type: 'string',
          example: 'StrongPassword123!',
          description: '사용자 비밀번호',
        },
      },
    },
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  signUp(@Body() body: { email: string; password: string }) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('signin')
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인하고 토큰을 발급받습니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'user@example.com',
          description: '사용자 이메일',
        },
        password: {
          type: 'string',
          example: 'StrongPassword123!',
          description: '사용자 비밀번호',
        },
      },
    },
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }
}
