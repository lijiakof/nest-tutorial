# 【Nest 极速指南】进阶篇之其它
Nest 还提供了其它很多有用的工具，来满足日常的业务开发，这些工具都是非常实用

* 异常
* 管道
* 守卫
* 拦截器

## 异常
Nest 内置的异常层，可以处理整个应用程序抛出的异常，当捕获到未处理的异常时，最终用户将收到友好的响应。它使用起来也很方便

* 创建异常过滤器，继承于 `ExceptionFilter`
* 通过 `UseFilters` 绑定到响应的类或者方法上

```
// http-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: exception.getStatus(),
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
```

```
// app.controller.ts

import { Controller, Get, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
export class AppController {

    @Get('/abc')
    @UseFilters(HttpExceptionFilter)
    // @UseFilters(new HttpExceptionFilter())
    getError() {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
}


```

## 管道
管道是将输入数据转换为所需的输出，
TODO：

## 守卫
守卫的功能是，请求是否应该由路由处理程序处理，通常用户权限的逻辑，可以统一通过守卫来解决：

* 创建守卫，继承于 `CanActivate`
* 通过 通过 `UseGuards` 绑定到响应的类或者方法上

```
// auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    validateRequest(request) {
        return request.query.user === 'jay';
    }
}
```

```
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/order')
    @UseGuards(AuthGuard)
    getOrder(): string {
        return this.appService.getHello();
    }
}

```

## 拦截器
拦截器可以完成向切面编程的一些功能：

* 在函数执行之前/之后绑定额外的逻辑
* 转换从函数返回的结果
* 转换从函数抛出的异常
* 扩展基本函数行为
* 根据所选条件完全重写函数 (例如, 缓存目的)

使用步骤：

* 创建拦截器，继承于 `NestInterceptor`
* 通过 通过 `UseInterceptors` 绑定到响应的类或者方法上


```
// logging.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(`After... ${Date.now() - now}ms`)),
            );
    }
}

```

```
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @UseInterceptors(LoggingInterceptor)
    getHello(): string {
        return this.appService.getHello();
    }
}

```

## 总结
从个人使用的角度上将，异常过滤器、管道、守卫，感觉都是不同功能类型的拦截器，整个 Nestjs 都是以 AOP 的思想贯穿始终，将各个不同的业务逻辑都通过切面，解耦到不同的拦截器中去，保证核心功能的逻辑清晰、职责单一。

〖坚持的一俢〗