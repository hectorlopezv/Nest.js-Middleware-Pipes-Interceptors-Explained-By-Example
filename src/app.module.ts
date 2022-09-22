import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthenticationMiddleware } from 'middleware/authentication.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RequestService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
