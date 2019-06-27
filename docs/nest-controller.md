# 【Nest 极速指南】进阶篇之 Controller
这篇文章你会学习到：

* 什么是 Controller
* 路由
    * 路由通配符
    * 路由参数
    * 路由注册顺序
* Request 对象
* 资源
* Headers
* 举个例子

## 什么是 Controller
Controller 控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器有多个路由，不同的路由可以执行不同的操作。

为了创建一个基本的控制器，我们必须使用`装饰器`。`装饰器`将会在未来的章节中给大家解释。

## 路由
我们通过控制器装饰器可以设置路由，例如：

```
// products.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    findAll(): string {
        return 'This action returns all products';
    }

    @Get('filters')
    filters(): string {
        return 'This action returns all filters';
    }
}
```

这样我可以通过 `localhost:3000/products` 和 `localhost:3000/products/filters` 获取到响应的数据。

### 路由通配符
我们可以通过路由通配符，来匹配多个路由：

```
// products.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('ab*cd')
    findAll(): string {
        return 'This action returns all products';
    }
}
```

以上路由地址将匹配 `abcd` 、`ab_cd` 、`abecd` 等。字符 `?` 、`+` 、 `*` 以及 `() `是它们的正则表达式对应项的子集。连字符 (`-`) 和点 (`.`) 按字符串路径解析。

### 路由参数
当需要接收动态数据作为请求的一部分，我们可以通过添加路由参数标记来获取该位置的动态值。

```
// products.controller.ts

import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} proudct`;
    }
}
```

### 路由注册顺序
路由的顺序很重要，如果通过 `products/:id` 返回产品信息，而返回所有产品信息路由为 `products`（代码如下），此时通过 `GET /products` 请求不会命中程序中第二个处理程序，因为所有路由的`参数`都是可选的：

```
// products.controller.ts

import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} proudct`;
    }

    @Get()
    findAll(): string {
        return return 'This action returns all products';
    }
}
```

为了避免这种副作用，只需将 findAll() 声明（包括其装饰器）移动到 findOne()上面即可。

## Request 对象
我们通过注入 `@Req()` 装饰器将请求对象注入处理程序，Nest 默认使用的是 express 的请求对象：

```
// products.controller.ts

import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
    // ...

    @Get('req-obj')
    getReq(@Req() request: Request): any {
        console.log(request);
        return request.headers;
    }
}
```

这样我们可以通过访问 `localhost:3000/req-obj` 看到请求 Request 对象。

## 资源
Nest 提供了 `@Put()`、`@Delete()`、`@Patch()`、`@Options()`、`@Head()` 和 `@All()` 这些修饰符来通过不同的 HTTP 方法请求并处理我们的逻辑：

```
// products.controller.ts

import { Controller, Get, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Post()
    create(): string {
        return 'This action adds a new product';
    }
}
```

## Headers
要指定自定义响应头，我们可以使用 `@Header()` 修饰器：

```
// products.controller.ts

import { Controller, Get, Post, Header } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('need-header')
    needHeader() {
        return 'This action need header';
    }
}
```

## 举个例子
以下是一个符合 RESTful 的完整例子：

```
// products.controller.ts

import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Post()
    create(@Body() product: any) {
        return 'This action adds a new product';
    }

    @Get()
    findAll(@Query() query: any) {
        return `This action returns all products (limit: ${query.limit} items)`;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} product`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() any) {
        return `This action updates a #${id} product`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} product`;
    }
}
```

然后我们将 `ProductsController` 注册到 `ApplicationModule` 中去，整个程序就可以跑起来了：

```
// app.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
})
export class ApplicationModule {}
```

〖坚持的一俢〗