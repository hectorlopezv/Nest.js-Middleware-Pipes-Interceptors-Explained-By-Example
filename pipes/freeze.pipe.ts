import { Injectable, Logger, PipeTransform } from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  private readonly looger = new Logger(FreezePipe.name);
  transform(value: any) {
    this.looger.log('pipe working ');
    return Object.freeze(value);
  }
}
