# 【Nest 极速指南】进阶篇之 Middleware
这篇文章你会学习到：

* 什么是中间件（Middleware）
* 使用中间件
    * 路由通配符
    * 中间件消费者（MiddlewareConsumer）
* 函数式中间件
* 多个中间件
* 全局中间件

## 什么是中间件
中间件是一个在路由处理器之前被调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 `next()` 中间件函数。 `next()` 中间件函数通常由名为 `next` 的变量表示。

Nest 中间件实际上等价于 Express 中间件，可以参考 Express 文档：http://expressjs.com/en/guide/using-middleware.html

Nest 中间件可以是一个函数，也可以是一个带有 `@Injectable()` 装饰器的类。这个类需要实现 ` NestMiddleware` 接口，例如：

```
// logger.middleware.ts

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        console.log('Request...');
        next();
    }
}
```

## 使用中间件
中间件不能在 `@Module` 装饰器中列出，我们需要使用模块类的 `configure()` 方法来设置它们，设置了中间件的模块必须实现 `NestModule` 接口，代码如下： 

```
// app.module.ts

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: 'products', method: RequestMethod.GET });
    }
}
```

我们可以通过设置 `forRoutes()` 将中间件在应该有的路由下起作用。

### 路由通配符
同样，中间件的路由是支持通配符的例如：

```
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL })
```

以上路由地址将匹配 abcd 、 ab_cd 、 abecd 等。字符 ? 、 + 、 * 以及 () 是它们的正则表达式对应项的子集。连字符 (-) 和点 (.) 按字符串路径解析。

### 中间件消费者
`MiddlewareConsumer` 是一个帮助类，它提供了几种内置方法来管理中间件，他们可以通过**链式**的方式来书写，`forRoutes()` 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类，大多数情况下你可能只会传递一个由逗号分隔的控制器列表：

```
// app.module.ts

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(AppController);
    }
}
```

我们也可以通过 `exclude()` 方法轻松地排除某些路由：

```
consumer
    .apply(LoggerMiddleware)
    .exclude(
        { path: 'products', method: RequestMethod.GET },
        { path: 'products', method: RequestMethod.POST }
    )
    .forRoutes(AppController);
```

## 函数式中间件
函数式中间件很简单，它就是一个普通的函数而已：

```
// logger.middleware.ts

export function logger(req, res, next) {
    console.log(`Request...`);
    next();
};
```

## 多个中间件
如果多个中间件，我们如何处理呢，只需要在 `apply()` 方法内用逗号分隔开：

```
consumer
    .apply(cors(), helmet(), logger)
    .forRoutes(AppController);
```

## 全局中间件
为了一次将中间件绑定到每个注册路由，我们可以利用实例 `INestApplication` 提供的方法 `use()`：

```
// main.ts

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(logger)
    await app.listen(3000);
}
```
