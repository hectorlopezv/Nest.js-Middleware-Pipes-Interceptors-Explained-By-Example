import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { RequestService } from 'src/request.service';

@Injectable()
export class LooginInterceptor implements NestInterceptor {
  private readonly looger = new Logger(LooginInterceptor.name);
  constructor(private readonly requestService: RequestService) {}
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get['user-agent'] || '';
    const { ip, method, path: url } = request;

    this.looger.log(`userId Interceptor ${this.requestService.getUserId()}`);
    this.looger.log(`${method} ${url} ${userAgent} ${ip}`);

    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.looger.log(
          `${method} ${url} ${statusCode} ${contentLength} ${
            Date.now() - now
          }ms`,
        );

        this.looger.debug('res', res);
      }),
    );
  }
}
