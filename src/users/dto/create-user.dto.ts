/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'Users full name', example: 'John Doe' })
    @IsString({ message: 'Full name must be a string' })
    @MinLength(1, { message: 'Full name is required' })
    fullname: string;

    @ApiProperty({ description: 'Users e-mail address', example: 'johndoe@example.com' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @ApiProperty({ description: 'Password for the user account (minimum 6 characters)', example: 'pass12' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
