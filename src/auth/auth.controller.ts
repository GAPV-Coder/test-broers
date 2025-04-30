/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('authentication')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Log in a user and return tokens' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        schema: {
            example: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid credentials',
        schema: {
            example: { statusCode: 401, message: 'Invalid credentials', error: 'Unauthorized' },
        },
    })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh access token using refresh token' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                refreshToken: {
                    type: 'string',
                    description: 'Refresh token issued during login',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'New access token generated',
        schema: {
            example: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid refresh token',
        schema: {
            example: { statusCode: 401, message: 'Invalid refresh token', error: 'Unauthorized' },
        },
    })
    refresh(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }

    @Post('forget-password')
    @ApiOperation({ summary: 'Request password reset email' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    description: 'Email address of the user',
                    example: 'johndoe@example.com',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Password reset email sent',
        schema: {
            example: {},
        },
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
        schema: {
            example: { statusCode: 404, message: 'User not found', error: 'Not Found' },
        },
    })
    forgotPassword(@Body('email') email: string) {
        return this.authService.sendPasswordResetEmail(email);
    }

    @Post('reset-password/:token')
    @ApiOperation({ summary: 'Reset password using reset token' })
    @ApiParam({
        name: 'token',
        description: 'Password reset token',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                newPassword: {
                    type: 'string',
                    description: 'New password for the user account',
                    example: 'newPassword123',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Password reset successful',
        schema: {
            example: {},
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid or expired reset token',
        schema: {
            example: { statusCode: 401, message: 'Invalid or expired reset token', error: 'Unauthorized' },
        },
    })
    resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(token, resetPasswordDto.newPassword);
    }
}