import { Controller, Delete, Get, Header, HttpCode, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    @Header('content-type', 'application/json')
    async fetchProducts(
        @Request() req: any
    ): Promise<any> {
        console.log('===> product/get/');
        return await this.productService.fetchProducts();
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Header('content-type', 'application/json')
    async deleteProducts(
        @Request() req: any
    ): Promise<any> {
        console.log('===> product/delete/');
        await this.productService.deleteProducts();
        return {};
    }

    @Get(':bar_code')
    @UseGuards(JwtAuthGuard)
    @Header('content-type', 'application/json')
    async fetchProduct(
        @Request() req: any,
        @Param('bar_code') bar_code: string
    ): Promise<any> {
        console.log('===> product:bar_code/get/');
        console.log({'bar code': bar_code});
        return await this.productService.fetchProduct(bar_code);
    }

    @Post(':bar_code')
    @UseGuards(JwtAuthGuard)
    @Header('content-type', 'application/json')
    async insertProduct(
        @Request() req: any,
        @Param('bar_code') bar_code: string
    ): Promise<any> {
        console.log('===> product:bar_code/post/');
        console.log({'bar code': bar_code});
        return await this.productService.insertProduct(bar_code);
    }

    @Delete(':bar_code')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Header('content-type', 'application/json')
    async deleteProduct(
        @Request() req: any,
        @Param('bar_code') bar_code: string
    ): Promise<any> {
        console.log('===> product:bar_code/delete/');
        console.log({'bar code': bar_code});
        return await this.productService.deleteProduct(bar_code);
    }
}
