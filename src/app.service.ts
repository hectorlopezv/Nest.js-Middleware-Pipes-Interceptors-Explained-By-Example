import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from './request.service';

@Injectable()
export class AppService {
  private readonly looger = new Logger(AppService.name);
  constructor(private readonly requestService: RequestService) {}
  getHello(): string {
    const userId = this.requestService.getUserId();
    this.looger.log('Get Hello User ID: ' + userId);
    return 'Hello World!';
  }
}
