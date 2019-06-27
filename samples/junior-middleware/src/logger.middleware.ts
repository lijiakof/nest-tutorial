import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next) {
        console.log('Request...');
        next();
    }
}