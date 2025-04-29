/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UserSeed } from './user.seed';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userSeed = app.get(UserSeed);
    await userSeed.seed();
    await app.close();
}
bootstrap();