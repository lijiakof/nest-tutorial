import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }

  async findOne(): Promise<Product> {
    return await this.productRepository.findOne();
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      take: 10,
    });
  }
}
