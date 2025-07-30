import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 8000);
  const ds = app.get(DataSource);
  console.log('✅ Database initialized?', ds.isInitialized);
}
bootstrap();
