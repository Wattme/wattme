import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NotFoundExceptionFilter } from './filters/NotFoundExceptionFilter';
import bodyParser from 'body-parser';
import Bugsnag from '@bugsnag/js';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WATT Wallet API service')
    .setDescription('...')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  Bugsnag.start({ apiKey: process.env.BUGSNAG_KEY || '' });
  
  await app.listen(3000);
}
bootstrap();



