/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('authentication')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    refresh(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }

    @Post('forget-password')
    forgotPassword(@Body('email') email: string) {
        return this.authService.sendPasswordResetEmail(email);
    }

    @Post('reset-password/:token')
    resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(token, resetPasswordDto.newPassword);
    }
}