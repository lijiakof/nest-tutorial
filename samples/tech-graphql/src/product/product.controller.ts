import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../graphql';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get(':id')
    findOneById(@Param('id') id: string): Product {
        console.log(id);
        return this.productService.findOne();
    }
}
