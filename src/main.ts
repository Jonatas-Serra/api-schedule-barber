import 'reflect-metadata';
import 'es6-shim';
import { NestFactory } from '@nestjs/core';
import { Request, Response } from 'express';
import { AppModule } from './app.module';

import AppError from './errors/AppError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((err: Error, request: Request, response: Response, _next: any) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
  });
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://agendabarber.vercel.app',
      'https://agendabarber.vercel.app/Dash',
      'https://agendabarber.vercel.app/Dash/resume',
      'https://agendabarber.vercel.app/Dash/settings',
      'https://agendabarber.vercel.app/Dash/products',
      'https://agendabarber.vercel.app/Dash/services',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
