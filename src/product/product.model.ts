import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    id_user: { type: String, required: true },
    bar_code: { type: String, required: true },
    product_name: { type: String, required: true },
    image_url: { type: String, required: true }
});

export interface Product extends mongoose.Document {
    _id: string;
    id_user: string;
    bar_code: string;
    product_name: string;
    image_url: string;
}
