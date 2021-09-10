import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyCnameRecord } from 'dns';
import { Model } from 'mongoose';

import { AuthService } from 'src/auth/auth.service';
import { FoodFact } from 'src/openfoodfact/openfoodfact.model';
import { OpenfoodfactService } from 'src/openfoodfact/openfoodfact.service';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
        private authService: AuthService,
        private openfoodfactService: OpenfoodfactService
        ) {}

    async fetchProducts(userToken: any): Promise<any> {
        const rawProducts = await this.retrieveAllProductsFromUserId(userToken.id);
        const products = rawProducts.map(({bar_code, product_name, image_url}) => ({
            bar_code,
            product_name,
            image_url
        }));
        const token = await this.authService.updateToken(userToken);

        return {token, products};
    }

    async deleteProducts(userToken: any): Promise<any> {
        const result = await this.productModel.deleteMany({id_user: userToken.id}).exec();
        if (!result.n)
            throw new NotFoundException('Could not find any product.');
        return this.authService.updateToken(userToken);
    }

    async fetchProduct(barCode: string, userToken: any): Promise<any> {
        const product = await this.openfoodfactService.fetchFact(barCode);
        console.log({'Fact': product});
        const token = await this.authService.updateToken(userToken);

        return {token, product};
    }

    async insertProduct(barCode: string, userToken: any): Promise<object> {
        await this.checkProductAlreadyExist(barCode, userToken.id);
        const newFact = await this.openfoodfactService.fetchFact(barCode);
        const newProduct = new this.productModel({
            id_user: userToken.id,
            bar_code: newFact.bar_code,
            product_name: newFact.product_name,
            image_url: newFact.image_url,
            data: {}
        });
        const res = await newProduct.save();
        console.log({'res': res})
        return this.authService.updateToken(userToken);
    }

    async deleteProduct(barCode: string, userToken: any): Promise<any> {
        const result = await this.productModel.deleteOne({id_user: userToken.id, bar_code: barCode}).exec();
        if (!result.n)
            throw new NotFoundException('Could not find product.');
        console.log(result);
        return this.authService.updateToken(userToken);
    }

    private async checkProductAlreadyExist(barCode: string, userID: string): Promise<void> {
        const products = await this.retrieveAllProductsFromUserId(userID);
        // console.log({'All produ': products});
        products.forEach(product => {
            // console.log({'current prod bar': product.bar_code})
            if (product.bar_code === barCode)
                throw new ConflictException('The resource already exists.');
        });
    }

    private async retrieveAllProductsFromUserId(userID: string): Promise<Product[]> {
        return this.productModel.find({id_user: userID}).exec();
    }
}
