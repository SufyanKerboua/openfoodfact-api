import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodFact } from './openfoodfact.model';

@Injectable()
export class OpenfoodfactService {
    constructor(private httpService: HttpService) {}

    public async fetchFact(barCode: string): Promise<FoodFact> {
        let fact = await (await this.httpService.get(`https://world.openfoodfacts.org/api/v0/product/${barCode}.json`).toPromise()).data;
        if (fact.status === 0)
            throw new NotFoundException(`The bar code: ${barCode}, doesn't coorespond to any product.`);
        // TODO: Rajouter un systeme permettant de stocker dynamiquement des champs désirés
        return new FoodFact(
            barCode,
            fact.product.product_name,
            fact.product.brands,
            fact.product.ingredients_text,
            fact.product.image_url
        );
    }
}
