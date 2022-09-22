import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { RequestService } from 'src/request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly looger = new Logger(AuthenticationMiddleware.name);
  constructor(private readonly requestService: RequestService) {}
  use(req: any, res: any, next: (error?: any) => void) {
    this.looger.log(AuthenticationMiddleware.name);
    //Autherntication the rerquest
    const user = '123';
    this.requestService.setUserId(user);

    //If the user is authenticated, then pass the request to the next middleware

    next();
  }
}
