import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { OpenfoodfactModule } from 'src/openfoodfact/openfoodfact.module';
import { OpenfoodfactService } from 'src/openfoodfact/openfoodfact.service';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
        AuthModule,
        UserModule,
        OpenfoodfactModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 0,
            responseType: 'json'
          })
    ],
    controllers: [ProductController],
    providers: [ProductService, OpenfoodfactService, HttpModule]
})
export class ProductModule {}