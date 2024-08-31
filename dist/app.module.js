"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./components/auth/auth.module");
const config_1 = require("@nestjs/config");
const mongoose_model_module_1 = require("./Schema/mongoose-model.module");
const mongoose_module_1 = require("./config/mongoose/mongoose.module");
const file_module_1 = require("./components/file/file.module");
const folder_module_1 = require("./components/folder/folder.module");
const shareFiles_module_1 = require("./components/shareFIles/shareFiles.module");
const s3Upload_module_1 = require("./components/s3/s3Upload.module");
const core_1 = require("@nestjs/core");
const logger_interceptors_1 = require("./interceptors/logger.interceptors");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env'],
                isGlobal: true,
            }),
            mongoose_module_1.DatabaseModule,
            mongoose_model_module_1.MongooseModelsModule,
            auth_module_1.AuthModule,
            file_module_1.FileModule,
            folder_module_1.FolderModule,
            shareFiles_module_1.ShareFileModule,
            s3Upload_module_1.S3UploadModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_INTERCEPTOR, useClass: logger_interceptors_1.LoggerInterceptor },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map