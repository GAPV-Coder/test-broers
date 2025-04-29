/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ description: 'Users full name', example: 'John Doe' })
    @IsOptional()
    @IsString({ message: 'Full name must be a string' })
    @MinLength(1, { message: 'Full name is required' })
    fullname?: string;

    @ApiProperty({ description: 'Users e-mail address', example: 'johndoe@example.com' })
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email address' })
    email?: string;
}