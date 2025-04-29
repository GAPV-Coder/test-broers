/* eslint-disable prettier/prettier */
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<{ headers: { authorization?: string }; user?: any }>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        try {
            const payload = jwt.verify(
                token,
                this.configService.get<string>('JWT_SECRET') || '',
            );
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid Token');
        }
    }

    private extractTokenFromHeader(request: { headers: { authorization?: string } }): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}