import 'dotenv/config';
import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { UserModule } from './Modules/Users/Users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './Services/Config/Postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { FilmsModule } from './Modules/FIlms/Films.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './Resources/Filters/GlobalException.filter';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './Modules/Auth/Auth.module';
import { GlobalLoggerInterceptor } from './Resources/Interceptors/GlobalLogger.interceptor';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    UserModule,
    FilmsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({ ttl: 10000, url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` }),
      }),

    })],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
  }, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }, {
    provide: APP_INTERCEPTOR,
    useClass: GlobalLoggerInterceptor
  }, ConsoleLogger],
})
export class AppModule { }
