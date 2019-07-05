# 【Nest 极速指南】应用篇之 ElasticSearch
Nest 官方提供了一套 ElasticSearch 模块，来解决它与 ElasticSearch 服务器之间的交互。这篇文章你将学习到：

* 安装
* 导入模块
* 创建服务
    * 使用 `ElasticsearchService` 查询数据
* 向外提供 RESTful 服务

## 安装
还是老规矩：

```
npm i --save @nestjs/elasticsearch elasticsearch @types/elasticsearch
OR
yarn add @nestjs/elasticsearch elasticsearch @types/elasticsearch
```

## 导入模块
安装完成后，我们需要将 `ElasticsearchModule` 导入到 `AppModule`：

```
// app.module.ts

import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
    imports: [
        ElasticsearchModule.register({
            host: 'localhost:9200',
            log: 'trace',
        }),
    ],
})
export class AppModule { }
```

## 创建服务
我们创建一个搜索服务，并将 `ElasticsearchService` 注入到服务中使用相关查询功能：

```
// search.service.ts

import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async search<T>(params) {
        return await this.elasticsearchService.getClient().search<T>(params);
    }
}
```

`Elasticsearch` 相关的搜索功能，我们可以去相关网站上查询，它的 DSL 也可以从 Google 上搜索到。

## 向外提供 RESTful 服务
最后，我将这个服务通过 `SearchController` 暴露成 RESTful 接口：

```
// search.controller.ts

import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
    ) { }

    @Get()
    search() {
        return this.searchService.search({
            index: 'test_alias',
            body: {
                from: 0,
                size: 10,
            }
        });
    }
}
```

当然，这些 Service、Controller 需要注册到相关的 Module 中去：



```
// app.module.ts

import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
    imports: [
        ElasticsearchModule.register({
            host: '10.5.11.86:9200',
            log: 'trace',
        }),
    ],
    controllers: [SearchController],
    providers: [SearchService],
})
export class AppModule { }
```

这样，启动并访问 `localhost:3000/search`，就大功告成了！

〖坚持的一俢〗