/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'User created successfully',
        schema: {
            example: {
                _id: '608f4c3b9f1b2c001f8b4567',
                fullname: 'John Doe',
                email: 'johndoe@example.com',
                isActive: true,
                createdAt: '2025-04-29T21:00:00.000Z',
                updatedAt: '2025-04-29T21:00:00.000Z',
                __v: 0,
            },
        },
    })
    @ApiResponse({
        status: 409,
        description: 'Email already exists',
        schema: {
            example: { statusCode: 409, message: 'El correo ya existe', error: 'Conflict' },
        },
    })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT')
    @ApiOperation({ summary: 'Get all active users' })
    @ApiResponse({
        status: 200,
        description: 'List of active users',
        schema: {
            example: [
                {
                    _id: '608f4c3b9f1b2c001f8b4567',
                    fullname: 'John Doe',
                    email: 'johndoe@example.com',
                    isActive: true,
                    createdAt: '2025-04-29T21:00:00.000Z',
                    updatedAt: '2025-04-29T21:00:00.000Z',
                    __v: 0,
                },
            ],
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        schema: {
            example: { statusCode: 401, message: 'Token not provided', error: 'Unauthorized' },
        },
    })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID', example: '608f4c3b9f1b2c001f8b4567' })
    @ApiResponse({
        status: 200,
        description: 'User found',
        schema: {
            example: {
                _id: '608f4c3b9f1b2c001f8b4567',
                fullname: 'John Doe',
                email: 'johndoe@example.com',
                isActive: true,
                createdAt: '2025-04-29T21:00:00.000Z',
                updatedAt: '2025-04-29T21:00:00.000Z',
                __v: 0,
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
        schema: {
            example: { statusCode: 404, message: 'User not found', error: 'Not Found' },
        },
    })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID', example: '608f4c3b9f1b2c001f8b4567' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: 200,
        description: 'User updated successfully',
        schema: {
            example: {
                _id: '608f4c3b9f1b2c001f8b4567',
                fullname: 'John Doe Update',
                email: 'john.doe.new@example.com',
                isActive: true,
                createdAt: '2025-04-29T21:00:00.000Z',
                updatedAt: '2025-04-29T21:10:00.000Z',
                __v: 0,
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
        schema: {
            example: { statusCode: 404, message: 'User not found', error: 'Not Found' },
        },
    })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT')
    @ApiOperation({ summary: 'Delete a user by ID (logical delete)' })
    @ApiParam({ name: 'id', description: 'User ID', example: '608f4c3b9f1b2c001f8b4567' })
    @ApiResponse({
        status: 200,
        description: 'User deleted successfully',
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
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}