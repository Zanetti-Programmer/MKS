import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { RequestWithUser } from "src/Guards/Auth.guard";

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {

    constructor
        (private NativeLogger: ConsoleLogger) { }

    catch(exception: unknown, host: ArgumentsHost) {

        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<RequestWithUser>();


        const {
            status, body
        } = exception instanceof HttpException ?
                {
                    status: exception.getStatus(),
                    body: exception.getResponse()
                }
                :
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    body: {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        timestamp: new Date().toISOString(),
                        path: request.url
                    }
                }

        response.status(status).json(body);
    }

}