import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot(
    'mongodb+srv://cruddemo:cruddemo@cluster.bzl3m.mongodb.net/crud-demo?retryWrites=true&w=majority'),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
