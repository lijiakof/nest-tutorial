import { Controller, Get } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from '../graphql';

@Resolver('Product')
// @Controller('products')
export class ProductResolver {
    constructor(private readonly productService: ProductService) { }

    @Query('product')
    // @Get(':id')
    findOneById(@Args('id') id: number): Product {
        console.log(id);
        return this.productService.findOne();
    }
}
