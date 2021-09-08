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
        return this.productService.fetchProducts(req.user);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Header('content-type', 'application/json')
    async deleteProducts(
        @Request() req: any
    ): Promise<any> {
        console.log('===> product/delete/');
        return this.productService.deleteProducts(req.user);
    }

    @Get(':bar_code')
    @UseGuards(JwtAuthGuard)
    @Header('content-type', 'application/json')
    async fetchProduct(
        @Param('bar_code') bar_code: string
    ): Promise<any> {
        console.log('===> product:bar_code/get/');
        return this.productService.fetchProduct(bar_code);
    }

    @Post(':bar_code')
    @UseGuards(JwtAuthGuard)
    @Header('content-type', 'application/json')
    async insertProduct(
        @Request() req: any,
        @Param('bar_code') bar_code: string
    ): Promise<any> {
        console.log('===> product:bar_code/post/');
        return this.productService.insertProduct(bar_code, req.user);
    }

    @Delete(':bar_code')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Header('content-type', 'application/json')
    async deleteProduct(
        @Request() req: any,
        @Param('bar_code') bar_code: string
    ): Promise<any> {
        console.log('===> product:bar_code/delete/');
        return this.productService.deleteProduct(bar_code, req.user);
    }
}
