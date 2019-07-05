import { Injectable } from '@nestjs/common';
import { Product } from '../graphql';

@Injectable()
export class ProductService {
    private readonly products: any[] = [];

    create(product: any) {
        this.products.push(product);
    }

    findOne(): Product {
        const product = new Product();
        product.id = 1;
        return product;
    }

    findAll(): any[] {
        return this.products;
    }
}
