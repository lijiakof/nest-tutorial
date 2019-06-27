import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    private readonly products: any[] = [];

    create(product: any) {
        this.products.push(product);
    }

    findAll(): any[] {
        return this.products;
    }
}