/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: 'Email address of the user', example: 'johndoe@example.com' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @ApiProperty({ description: 'Password for the user account', example: 'pass123' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(1, { message: 'Password is required' })
    password: string;
}