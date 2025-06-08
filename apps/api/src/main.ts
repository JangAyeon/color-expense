import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './utils/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use((req, res, next) => {
    req.headers['content-type'] = 'application/json';
    next();
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('color expense API')
    .setDescription(`color expense API 서버 문서입니다.`)
    .setVersion('1.0')
    .addBearerAuth(
      // ✅ JWT 토큰 설정
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token', // 이 이름을 아래 @ApiBearerAuth()에 맞춰줘야 함
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const theme = new SwaggerTheme();
  const options = {
    explorer: false,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
    swaggerOptions: {
      persistAuthorization: true, // ✅ 새로고침해도 토큰 유지
    },
  };

  SwaggerModule.setup(`api`, app, document, options);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
