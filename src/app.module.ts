import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from 'filters/http.exception';
import { AuthGuard } from 'guards/auth.guard';
import { LooginInterceptor } from 'interceptors/loogin.intercepetors';
import { AuthenticationMiddleware } from 'middleware/authentication.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LooginInterceptor,
      scope: Scope.REQUEST,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
