import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { json, urlencoded } from 'express';
import { mkdirSync, existsSync } from "fs";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(urlencoded({ extended: true }));
  app.use(json({ limit: '50mb' }));

  // Cho phép truy cập thư mục chứa ảnh
  app.use('/uploads', express.static('uploads'));
  const uploadPath = "./uploads";
  if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
  }
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
