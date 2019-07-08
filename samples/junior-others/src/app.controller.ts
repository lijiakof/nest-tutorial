import { Controller, Get, UseInterceptors, UseGuards, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './logging.interceptor';
import { AuthGuard } from './auth.guard';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return this.appService.getHello();
  }

  @Get('/abc')
  @UseFilters(HttpExceptionFilter)
  // @UseFilters(new HttpExceptionFilter())
  getError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('/order')
  @UseGuards(AuthGuard)
  getOrder(): string {
    return this.appService.getHello();
  }
}
