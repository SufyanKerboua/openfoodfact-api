import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OpenfoodfactModule } from './openfoodfact/openfoodfact.module';
import { mongoDB } from './constants';


@Module({
  imports: [
    MongooseModule.forRoot(mongoDB.uri),
    AuthModule,
    UserModule,
    ProductModule,
    OpenfoodfactModule
  ]
})
export class AppModule {}
