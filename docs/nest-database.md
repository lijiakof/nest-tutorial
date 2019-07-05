# 【Nest 极速指南】应用篇之数据库
Nest 也提供了类似于 Mybatis 的 ORM 工具，这样会简化对连接数据库的操作提高工作效率，Nest 使用的是 `@nestjs/typeorm` 包来完成的，因为 [TypeORM](https://github.com/typeorm/typeorm) 是目前 Nodejs 中最成熟的 ORM 工具。

这篇文章你会学习到：

* 安装 & 导入模块
* 创建实体对象
* 查询数据
* 多个数据库

## 安装 & 导入模块
我们用 Mongo 作为例子，安装老规矩：

```
npm install --save @nestjs/typeorm typeorm mongodb
Or
yarn add @nestjs/typeorm mongodb
```

安装完成后，我们需要将 `TypeOrmModule` 导入到 `AppModule`：

```
// app.module.ts

import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            username: 'username',
            password: 'password',
            database: 'test',
            entities: [join(__dirname, '**/**.entity{.ts,.js}')],
            synchronize: true,
        }),
    ],
})
export class AppModule { }

```

## 创建实体对象
接下来我们需要对数据库表和对象之间做一个映射实体类：

```
// product.entity.ts

import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({
    name: 'product',
})
export class Product {
    @ObjectIdColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;
}

```

实体类需要注册到对应的模块中去，这样相关的 `Controller`、`Service` 或者其它模块才能访问到。


```
// product.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule { }
```

## 查询数据
然后，我们需要使用 @InjectRepository() 修饰器向 `ProductsService` 注入 `ProductsRepository`，这样我就可以操作数据库中的数据了：

```
// products.service.ts

import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly hotelRepository: Repository<Product>,
    ) { }

    async findOne(): Promise<Product> {
        return await this.hotelRepository.findOne();
    }

    async findAll(): Promise<Product[]> {
        return await this.hotelRepository.find({
            take: 10,
        });
    }
}

```

最后，我将这个服务通过 `ProductsController` 暴露成 RESTful 接口：

```
// products.controller.ts

import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) { }

    @Get()
    findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(): Promise<Product> {
        return this.productsService.findOne();
    }
}
```

## 多个数据库
当然某些项目需要连接多个库 ，我们可以这样做：

```
const defaultOptions = {
    type: 'mongodb',
    port: 27017,
    username: 'username',
    password: 'password',
    database: 'database',
    synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...defaultOptions,
      host: 'product_db_host',
      entities: [Product],
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      name: 'orderConnection',
      host: 'order_db_host',
      entities: [Order],
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      name: 'userConnection',
      host: 'userdb_host',
      entities: [User],
    }),
  ],
})
export class AppModule {}
```

〖坚持的一俢〗