"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerInterceptor = void 0;
const rxjs_1 = require("rxjs");
class LoggerInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const startTime = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            const endTime = Date.now();
            const resTime = endTime - startTime;
            console.log(`${request.method} ${request.path} ${response.statusCode} ${resTime}ms`);
        }));
    }
}
exports.LoggerInterceptor = LoggerInterceptor;
//# sourceMappingURL=logger.interceptors.js.map