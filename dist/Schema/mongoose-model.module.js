"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseModelsModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("./auth/auth.schema");
const common_1 = require("@nestjs/common");
const file_schema_1 = require("./file/file.schema");
const folder_schema_1 = require("./folder/folder.schema");
const shareFile_schema_1 = require("./shareFile/shareFile.schema");
const log_schema_1 = require("./log/log.schema");
const MODELS = [
    { name: auth_schema_1.USER_MODEL, schema: auth_schema_1.UserSchema },
    { name: file_schema_1.FILE_MODEL, schema: file_schema_1.FileSchema },
    { name: folder_schema_1.FOLDER_MODEL, schema: folder_schema_1.FolderSchema },
    { name: shareFile_schema_1.SHAREFILE_MODEL, schema: shareFile_schema_1.ShareFileSchema },
    { name: log_schema_1.LOGS_MODEL, schema: log_schema_1.LogsSchema },
];
let MongooseModelsModule = class MongooseModelsModule {
};
exports.MongooseModelsModule = MongooseModelsModule;
exports.MongooseModelsModule = MongooseModelsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(MODELS)],
        exports: [mongoose_1.MongooseModule],
    })
], MongooseModelsModule);
//# sourceMappingURL=mongoose-model.module.js.map