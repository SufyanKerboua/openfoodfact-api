import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from 'src/auth/auth.service';
import { User } from '../user/user.model';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>, 
        @InjectModel('Product') private readonly productModel: Model<Product>,
        private authService: AuthService
        ) {}

    async fetchProducts(): Promise<Array<Product>> {

        return [];
    }

    async deleteProducts(): Promise<any> {

    }

    async fetchProduct(bar_code: string): Promise<Product> {
        return new this.productModel({
            id_user: "aze",
            bar_code: "aze",
            product_name: "aze",
            image_url: "aze"
        });
    }

    async insertProduct(bar_code: string): Promise<Product> {
        return new this.productModel({
            id_user: "aze",
            bar_code: "aze",
            product_name: "aze",
            image_url: "aze"
        });
    }

    async deleteProduct(bar_code: string): Promise<any> {
    }
}
