import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const logger = new Logger('boostrapp');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors:true});
  app.setGlobalPrefix('v1/api');
  app.enableCors({});
  const port = process.env.PORT || 4000;
  await app.listen(port).then(() => {
    logger.log('listenning on port :' + port);
  });
}
bootstrap();
