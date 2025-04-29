/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'Full name must be a string' })
    @MinLength(1, { message: 'Full name is required' })
    fullname?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email address' })
    email?: string;
}