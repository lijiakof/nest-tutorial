# 【Nest 极速指南】进阶篇之 Provider
这篇文章你会学习到：

* 什么是 Provider
* 创建一个服务
* 依赖注入
* 定制 Provider
* 可选 Provider
* 基于属性的注入
* 注册 Provider

## 什么是 Provider
几乎所有的组件模块都可以认为是 Provider：service, repository, factory, helper 等等。他们都可以通过构造函数 `constructor` 注入依赖关系，事实上 Provider 只不过是 `@Injectable()` 装饰器注解的类。

## 创建一个服务
我们从创建一个简单的 ProductsService 开始，该服务将负责处理相关数据：

```
// products.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    private readonly products: any[] = [];

    create(product: any) {
        this.products.push(product);
    }

    findAll(): any[] {
        return this.products;
    }
}
```

现在我们通过一个 Controller 类，将这个服务的相关功能提供出去：

```
// products.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async create(@Body() product: any) {
        this.productsService.create(product);
    }

    @Get()
    async findAll(): Promise<any[]> {
        return this.productsService.findAll();
    }
}
```

`ProductsService` 通过类构造函数注入到整 `ProductsController` 中去，在 `ProductsController` 内部可以使用 `ProductsService` 实例 `productsService`。


## 依赖注入
Nest 是建立在依赖注入之上的，通过 TypetScript 管理依赖关系非常简单，因为它们只会按照类型解析，例如：

```
constructor(private readonly productsService: ProductsService) {}

```

依赖，是当类需要执行其功能时，所需要的服务或对象。 依赖注入是一种编码模式，其中的类会从外部源中请求获取依赖，而不是自己创建它们。我们建议大家阅读一下 [Angular 中的依赖注入](https://angular.cn/guide/dependency-injection) 这篇文章，来理解这个概念。

## 定制 Provider
这部分请参看：https://docs.nestjs.cn/6/fundamentals

## 基于属性的注入
在一些非常特殊的情况下，基于属性的注入可能会有用。例如，如果顶级类依赖于一个或多个提供者，那么通过从构造函数中调用子类中的 super() 来传递它们就会非常烦人了。因此，为了避免出现这种情况，可以在属性上使用 @inject() 装饰器：

```
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
    @Inject('HTTP_OPTIONS')
    private readonly httpClient: T;
}
```

## 注册 Provider
我们如果定义好一个 Provider （ProductsService），并且有了 Provider 的使用者（ProductsController）后，我们需要使用 Nest 注册该服务，以便它可以执行注入。我们通过 `app.module.ts` 将服务注册到整个应用中去：

```
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class AppModule {}
```

这样一来，Provider 就可以在整个程序中使用了。

〖坚持的一俢〗