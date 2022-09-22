import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FreezePipe } from 'pipes/freeze.pipe';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseGuards(FreezePipe)
  examplePost(@Body(new FreezePipe()) body: any) {
    body.test = 32;
  }

  @Get('error')
  thorwError() {
    throw new InternalServerErrorException('error baby');
  }
}
