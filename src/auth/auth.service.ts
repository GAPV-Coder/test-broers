/* eslint-disable prettier/prettier */
import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { EmailService } from '../common/services/email.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
        private emailService: EmailService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.isActive) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const { password: _, ...result } = user.toObject();
        return result;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = { sub: user._id, email: user.email };
        const jwtSecret = this.configService.get<string>('JWT_SECRET');

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in the configuration');
        }

        const accessToken = jwt.sign(payload, jwtSecret, {
            expiresIn: '1h',
        });

        const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
        if (!jwtRefreshSecret) {
            throw new Error('JWT_REFRESH_SECRET is not defined in the configuration');
        }
        const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }

    refreshToken(refreshToken: string) {
        try {
            const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
            if (!jwtRefreshSecret) {
                throw new Error('JWT_REFRESH_SECRET is not defined in the configuration');
            }
            const payload = jwt.verify(
                refreshToken,
                jwtRefreshSecret
            ) as unknown as { sub: string; email: string };
            const newPayload = { sub: payload.sub, email: payload.email };
            return {
                accessToken: jwt.sign(newPayload, this.configService.get<string>('JWT_SECRET') || '', {
                    expiresIn: '1h',
                }),
            };
        } catch (error) {
            console.error('Error en jwt.verify:', error); // Depuración
            throw new UnauthorizedException('Invalid update token');
        }
    }

    async sendPasswordResetEmail(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.isActive) {
            throw new NotFoundException('User not found');
        }

        const resetToken = uuidv4();
        const resetExpires = new Date(Date.now() + 3600000);
        await this.usersService.updateResetToken(user._id, resetToken, resetExpires);

        const resetLink = `http://localhost:3000/authentication/reset-password/${resetToken}`;
        await this.emailService.sendMail(
            email,
            'Password Reset Request',
            `Click on this link to reset your password: ${resetLink}`,
        );
    }

    async resetPassword(token: string, newPassword: string) {
        const user = await this.usersService.findByResetToken(token);
        if (!user) {
            throw new UnauthorizedException('Invalid or expired reset token');
        }

        await this.usersService.updatePasswordAndClearResetToken(user._id, newPassword);
    }
}