import { CanActivate, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly looger = new Logger(AuthGuard.name);
  canActivate(context: any) {
    const request = context.switchToHttp().getRequest();

    return true;
  }
}
