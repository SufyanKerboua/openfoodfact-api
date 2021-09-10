import { Controller, Delete, Get, Header, HttpCode, Param, Post, Query, Request, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    @Header('content-type', 'application/json')
    async fetchProducts(
        @Response() res: any,
        @Request() req: any
    ): Promise<any> {
        const response = await this.productService.fetchProducts(req.user);
        return res.json({...response});
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Header('content-type', 'application/json')
    async deleteProducts(
        @Response() res: any,
        @Request() req: any
    ): Promise<any> {
        const token = await this.productService.deleteProducts(req.user);
        return res.json({...token});
    }

    @Get(':bar_code')
    @UseGuards(JwtAuthGuard)
    @Header('content-type', 'application/json')
    async fetchProduct(
        @Response() res: any,
        @Request() req: any,
        @Param('bar_code') bar_code: string
    ): Promise<any> {
        const response = await this.productService.fetchProduct(bar_code, req.user);
        return res.json({...response});
    }

    @Post(':bar_code')
    @UseGuards(JwtAuthGuard)
    @Header('content-type', 'application/json')
    async insertProduct(
        @Response() res: any,
        @Request() req: any,
        @Param('bar_code') bar_code: string
    ): Promise<any> {
        const token = await this.productService.insertProduct(bar_code, req.user);
        return res.json({...token});
    }

    @Delete(':bar_code')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Header('content-type', 'application/json')
    async deleteProduct(
        @Response() res: any,
        @Request() req: any,
        @Param('bar_code') bar_code: string
    ): Promise<any> {
        const token = await this.productService.deleteProduct(bar_code, req.user);
        return res.json({...token});
    }
}
