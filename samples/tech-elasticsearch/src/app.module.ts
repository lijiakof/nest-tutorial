import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

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
export class AppModule {}
