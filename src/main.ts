import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  if (dataSource.isInitialized) {
    console.log('Database is already connected!');
  } else {
    console.error('Database is not connected!');
  }

  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}
bootstrap();
