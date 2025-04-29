/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(CreateUserDto: CreateUserDto): Promise<User> {
        const { email, password } = CreateUserDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('Email already exists')
        }

        let hashedPassword: string;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch {
            throw new Error('Error hashing the password');
        }
        const user = new this.userModel({
            ...CreateUserDto,
            password: hashedPassword,
        })
        return user.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find({ isActive: true }).exec();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user || !user.isActive) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();

        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }

        return updatedUser;
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .exec();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
}