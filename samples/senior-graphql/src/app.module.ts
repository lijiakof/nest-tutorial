import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductResolver } from './product/product.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      debug: false,
      playground: true,
    }),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService, ProductResolver],
})
export class AppModule {}
