/* eslint-disable prettier/prettier */
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
    @ApiProperty({ description: 'Upgrade token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    @IsString({ message: 'The update token must be a string' })
    @MinLength(1, { message: 'Update token is required' })
    refreshToken: string;
}