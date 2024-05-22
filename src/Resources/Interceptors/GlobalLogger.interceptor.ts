import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from 'src/Guards/Auth.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {

    constructor(private logger: ConsoleLogger) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();

        const request = httpContext.getRequest<Request | RequestWithUser>();
        const response = httpContext.getResponse<Response>();

        const { path, method } = request;
        const { statusCode } = response;

        const insteadBefore = Date.now();

        return next.handle().pipe(
            tap(() => {
                this.logger.log(`Path ${path}, Method ${method}`);
                if ('user' in request) {
                    this.logger.log(`Route acessed by user: ${request.user.sub}`);
                }
                const execTime = Date.now() - insteadBefore;
                this.logger.log(`'Response status: ${statusCode} | Execution time: ${execTime}ms'`);
            })
        );
    }
}
