import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): import("rxjs").Observable<any>;
}
