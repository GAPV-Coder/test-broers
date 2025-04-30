/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    fullname: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: null })
    resetPasswordToken?: string;

    @Prop({ default: null })
    resetPasswordExpires?: Date;

    declare _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User); 