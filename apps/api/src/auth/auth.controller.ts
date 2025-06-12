// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { Request } from 'express';

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
  @Post('signout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '로그아웃',
    description: '현재 로그인된 사용자의 액세스 토큰으로 로그아웃합니다.',
  })
  @ApiResponse({ status: 201, description: '로그아웃 성공' })
  @ApiResponse({ status: 500, description: '인증 실패' })
  signOut(@Req() req: Request) {
    const authHeader = `${req.headers.authorization}`;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization 헤더가 없습니다.');
    }

    return this.authService.signOut(authHeader);
  }
}
