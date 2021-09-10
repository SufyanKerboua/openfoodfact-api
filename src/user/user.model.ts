import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    desc: { type: String, required: false },
    wanted_data: { type: Object, required: false }
});

export interface User extends mongoose.Document {
    _id: string;
    username: string;
    password: string;
    salt: string;
    desc: string;
    wanted_data: object;
}
