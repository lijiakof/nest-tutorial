
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
            },
        });
    }
}
