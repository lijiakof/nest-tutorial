import { Controller, Get, Post, Req, Param, Header, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async create(@Body() product: any) {
        this.productsService.create(product);
    }

    @Get()
    async findAll(): Promise<any[]> {
        return this.productsService.findAll();
    }
}
