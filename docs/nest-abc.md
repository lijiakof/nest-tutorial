# 【Nest 极速指南】基础篇
这篇文章你会学习到：

* 什么是 Nest
* 开发环境 & 安装
* Hello World

# 什么是 Nest

Nest 是用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架。它与 Express 和 Koa 有所不同，如果用前端框架来比喻，它和 Express（或者 Koa）的区别就如 Vue 与 jQuery 的区别一样。Express（或者 Koa）它们是基础的 Web 框架，提供了，从 Nodejs 底层框架中抽离出来的，服务于 Web 服务的基础框架，但是 Nest 则是再基础框架之上又增加了各种符合不同业务场景的模块或者功能，它就好比是 Node Spring 一样，支持 TypeScript，面向 AOP，可构建微服务应用的强大框架。

## 开发环境 & 安装

* 安装 Node.js 开发环境
* 安装 Nest CLI
* 创建项目并启动

### 安装 Node.js
这是常规操作，到 [Node.js](https://nodejs.org/) 官网，根据自己的平台下载安装。

### 安装 Nest CLI
这个也是常规操作，确保自己安装了 NPM，然后：

```
npm i -g @nestjs/cli
OR
yarn global add @nestjs/cli
```

### 创建项目并启动
通过 Nest CLI 可以帮你创建新项目：

```
nest new project-name
```

你将会看到响应的项目目录上创建了一些文件：

```
├── src
├   ├── app.controller.ts
├   ├── app.module.ts
├   └── main.ts
├── test
├── .gitignore
├── nest-cli.json
├── nodemon-debug.json
├── nodemon.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
├── tslint.json
└── yarn.lock

```

重要文件概要：

* app.controller.ts 带有单个路由的基本控制器示例
* app.module.ts     应用程序的根模块
* main.ts           应用程序入口文件

`main.ts` 负责引导我们的应用程序，向外提供 Web 服务：

```
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3000);
}
bootstrap();
```

## Hello World
`app.controller.ts` 控制器中注入 `AppService`，并且调用了 `AppService` 的 `getHello()` 方法：

```
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
```

`app.module.ts` 模块类中创建了 `getHello()` 方法，它返回字符串 `Hello World!`

```
// app.module.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
```

### 启动
此刻运行命令：

```
yarn start
```

整个项目会在 `3000` 端口上启动一个 `HTTP` 服务，通过访问 `http://localhost:3000/` 你就可以看到浏览器上显示 `Hello World!`。