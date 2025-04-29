/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserSeed {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async seed() {
        const users = [
            {
                fullname: 'Juan Pérez',
                email: 'jperez@eexample.com',
                password: await bcrypt.hash('pass123', 10),
                isActive: true,
            },
            {
                fullname: 'María Gómez',
                email: 'magomez@example.com',
                password: await bcrypt.hash('pass456', 10),
                isActive: true,
            },
            {
                fullname: 'Antonio Gallardo',
                email: 'agallardo@example.com',
                password: await bcrypt.hash('pass789', 10),
                isActive: true,
            },
            {
                fullname: 'Eugenia Calderón',
                email: 'ecalderon@example.com',
                password: await bcrypt.hash('pass234', 10),
                isActive: true,
            },
            {
                fullname: 'Salomón Perea',
                email: 'sperea@example.com',
                password: await bcrypt.hash('pass567', 10),
                isActive: true,
            },
            {
                fullname: 'Fernando Carro',
                email: 'fcarro@example.com',
                password: await bcrypt.hash('pass890', 10),
                isActive: true,
            },
            {
                fullname: 'Daniela Castro',
                email: 'dcastro@example.com',
                password: await bcrypt.hash('pass108', 10),
                isActive: true,
            },
            {
                fullname: 'Acelardo Pinzón',
                email: 'apinzon@example.com',
                password: await bcrypt.hash('pass778', 10),
                isActive: true,
            },
            {
                fullname: 'Ruperto Solano',
                email: 'rsolano@example.com',
                password: await bcrypt.hash('pass458', 10),
                isActive: true,
            },
            {
                fullname: 'Alexanda Torres',
                email: 'atorres@example.com',
                password: await bcrypt.hash('pass982', 10),
                isActive: true,
            },
        ];

        await this.userModel.deleteMany({});
        await this.userModel.insertMany(users);
        console.log('Database seeded with test users');
    }
}