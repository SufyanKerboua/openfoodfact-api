import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
        AuthModule,
        UserModule
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {}