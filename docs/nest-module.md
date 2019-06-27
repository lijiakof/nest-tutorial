# 【Nest 极速指南】进阶篇之 Module
这篇文章你会学习到：

* 什么是 Module
* 功能模块
* 共享模块
* 模块重新导出
* 依赖注入
    * 全局模块
    * 动态模块

## 什么是 Module

在 Nest 应用程序中至少有一个模块，即根模块。根模块是 Nest 应用程序的起点，对于一个小项目来说一个程序可能只有一个模块，但是对于大型项目来说可能就会有多个模块了，这样一来我们需要对模块进行分类，将相同类型的模块组合在一起，形成一个树状关系的模块树。

我们可以通过装饰器 `@Module()` 来将类设置成模块，它可以接收的属性：

* providers
* controllers
* imports
* exports

我们需要把相关的 Provider 注册到 Module 中去，**如果 Provider 不是模块的一部分，那么它就是无法注入的！**

## 功能模块
功能模块其实就是一组功能相同或者类似的类的组合模块，例如：我们将 `ProductsController` 和 `ProductsService` 类放到 `ProductsModule` 中去，让他们新增一个组合模块。

```
// products.module.ts

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}

```

当然 `ProductsModule` 这个模块需要被导入到程序的根模块中去 `ApplicationModule`：

```
// app.module.ts

import { Module } from '@nestjs/common';
import { ProductsModule } from './products.module';

@Module({
    imports: [ProductsModule],
})
export class ApplicationModule {}

```

## 共享模块
在 Nest 中默认情况下，模块内的 Provider 只能在当前模块内的其它 Provider 使用，但是我们可以通过共享模块，让 `ProductsService` 在其它模块中的 Provider 都能使用：

```
// products.module.ts

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule {}

```

## 模块重新导出
模块可以导出他们的内部 Provider，而且，他们可以再导出自己导入的模块（这？？什么场景）：

```
@Module({
    imports: [CommonModule],
    exports: [CommonModule],
})
export class CoreModule {}
```

## 依赖注入
Provider 可以注入到模块中：

```
// products.module.ts

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {
    constructor(private readonly productsService: ProductsService) {}
}

```

但是，模块类不能注入到 Provider，这样会引起循环引用。

### 全局模块
你可以通过 `@Global` 装饰器使模块成为全局作用域，这样一来你就可以不用在使用的时候再导入相同的模块了：

```
// products.module.ts

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Global()
@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule { }

```

这样一来 `ProductsService` 将无处不在。但是一切全局化并不是一个好的选择，`imports` 数组仍然是使模块 API 透明的最佳方式。

### 动态模块
这部分请参考官方文档：https://docs.nestjs.com/modules

〖坚持的一俢〗