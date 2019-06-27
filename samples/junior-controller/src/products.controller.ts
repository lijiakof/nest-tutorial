import { Controller, Get, Post, Req, Param, Header } from '@nestjs/common';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
    @Get()
    findAll(): any[] {
        return [{
            id: 1,
            name: 'proudct1',
        }, {
            id: 2,
            name: 'proudct2',
        }];
    }

    @Get('filters')
    filters(): string {
        return 'This action returns all filters';
    }

    @Get('req-obj')
    getReq(@Req() request: Request): any {
        console.log(request);
        return request.headers;
    }

    @Post()
    create(): string {
        return 'This action adds a new product';
    }

    @Get('need-header')
    @Header('Cache-Control', 'none')
    needHeader() {
        return 'This action need header';
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} proudct`;
    }
}
