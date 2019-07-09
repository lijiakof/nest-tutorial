# 【Nest 极速指南】总结篇
Nest 作为一个渐进式的 Node.js 服务器端框架，它实现了类似于 Java Spring 的功能，可以说是填补了现在 JavaScript 在服务器端的企业级应用框架，再加上 TypeScript 的支持，它让开发体验得到进一步提高。官方给 Nest 特性：可扩展、可伸缩的渐进式服务器端应用程序框架。当然我们还不知道它的威力是否大过现在流行的服务端框架 Java Spring 或者 .NET 等，但是它给我们带来的希望是 JavaScript 的全栈能力。

通过一段时间 Nest 的学习和简单实践，回过头来总结一下，以便未来更好的运用。

## 先回顾相关文章：
* [《【Nest 极速指南】基础篇之 HelloWorld》](./nest-abc.md)
* [《【Nest 极速指南】基础篇之 Controller》](./nest-controller.md)
* [《【Nest 极速指南】基础篇之 Provider》](./nest-provider.md)
* [《【Nest 极速指南】基础篇之 Module》](./nest-module.md)
* [《【Nest 极速指南】进阶篇之 Middleware》](./nest-middleware.md)
* [《【Nest 极速指南】进阶篇之其它》](./nest-others.md)
* [《【Nest 极速指南】应用篇之数据库》](./nest-database.md)
* [《【Nest 极速指南】应用篇之 ElasticSearch](./nest-elasticsearch.md)

## Nest 的基本功能
Nest 基本功能已经提供了日常所需，但是在使用的时候，切记它的设计原则：AOP 的编程思想，大量使用依赖注入的方式。下面我们一一介绍：

* Controller
* Provider
* Module
* Middleware
* ExceptionFilter
* Pipe
* Guard
* Interceptor

### Controller
Controller 负责处理传入的请求，并返回相关响应。它内置的路由和获取 HTTP 上下文相关模块，让我们很好的处理业务逻辑，并完成 RESTful 接口。当然，它要其效果，必须要注册到模块的 `controllers` 属性中去。

### Provider
几乎所有的组件模块都可以认为是 Provider：service, repository, factory, helper 等等。他们都可以通过构造函数 `constructor` 注入依赖关系。Provider 可以说是 Controller 的辅助模块，它可以帮助你连接数据库、获取缓存数据、公共数据处理模块等等。当然，他也需要注册到模块的 `providers` 属性中去。

### Module
Module 这个组件起到将各个模块组织在一起的作用，Nest 应用程序也必须有一个 Module 模块。

### Middleware
Middleware 是一个在路由处理器之前被调用的函数，中间件函数可以访问请求和响应对象，它可以作为对请求数据和返回数据的处理。

### ExceptionFilter
ExceptionFilter 是解决异常处理的，需要实现 `ExceptionFilter`，然后通过 `@UseFilters` 来使用。

### Pipe
Pipe 管道是用来做数据转换的，另外它也可以处理数据的验证，需要实现 `PipeTransform`，然后通过 `@UsePipes` 来使用。

### Guard
Guard 守卫是来解决权限问题的，它可以针对某个请求来控制路由的可用不可用。需要实现 `CanActivate`，然后通过 `@UseGuards` 来使用。

### Interceptor
Interceptor 拦截器，上面的 ExceptionFilter、Pipe、Guard 个人感觉是拦截器的特定场景的实现，当然还有很多不再这些业务场景的功能，那就需要拦截器来做了。同样需要实现 `NestInterceptor`，然后通过 `@UseInterceptors` 来使用。

## Nest 相关技术
Nest 还提供了和服务端相关的各种组件，例如 ORM、ES、Redis 等相关技术，来满足日常开发：

* TypeORM
* Authentication
* Caching
* Serialization
* Log
* Security
* Configuration
* GraphQL
* ...

### TypeORM
TypeORM 绝对是 Node.js 中可用的最成熟的对象关系映射器 (ORM)，我们只需要通过简单的编写，就能够完成数据库的相关操作。

### Authentication
Authentication 这一块 Nest 采用的是 Nodejs 最流行的库 `passport`，他可以帮你很容易的解决权限相关问题。

### Caching
Nest 也提供了丰富的缓存方式：内存缓存、Redis、自定义缓存等等。

### Serialization
Nest 附带了这个 ClassSerializerInterceptor 类。它使用类转换器来提供转换对象的声明性和可扩展方式。

### Log
日志记录是服务端应用不可获取的功能，Nest 提供了内置的日志系统，当然也可以采用用户自己提供的。

### Security
安全这一块，Nest 提供了 Helmet、CORS、CSRF、限速等功能。

### Configuration
针对不同环境的运行 Nest 提供了 ConfigModule 来解决这一问题，不过个人还是觉得不要使用它自带的，自己来写就行了。

### GraphQL
当今前端流行的 GraphQL，它当然支持，只需要简单的引入相关模块就可以了。

## 写在最后
Nest 的确是一个 Nodejs 服务器端应用的一个完善的框架，它提供了强大的工具让我们完成一个后端 API 的相关功能，从路由到权限、从数据库到缓存、从日志到安全，甚至是比较流行的搜索、GraphQL、微服务等功能它也提供给我们。个人感觉，它是现阶段 Nodejs 相对完善的、可以作为企业级开发的框架。

当然 Nodejs 的服务端应用，相比起 Java、.NET、Pathy 这些经典框架来说，还有很多不足之处，当然这些经典框架都有大厂和广大社区的大力支持和发展。但是 JavaScript 这种跨端而生的语言来说，Nest 是一个新的开端，它告诉我们 JavaScript 不仅可以作为 Web 端 App 端的开发语言，也能够很好的应付服务器端复杂的业务。期待它变得更好更强大。

〖坚持的一俢〗