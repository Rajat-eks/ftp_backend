"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_MODEL = exports.FileSchema = exports.File = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("../auth/auth.schema");
const mongoose_2 = require("mongoose");
let File = class File {
};
exports.File = File;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], File.prototype, "fileName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], File.prototype, "filePath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'user' }),
    __metadata("design:type", auth_schema_1.User)
], File.prototype, "user", void 0);
exports.File = File = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], File);
exports.FileSchema = mongoose_1.SchemaFactory.createForClass(File);
exports.FILE_MODEL = File.name;
//# sourceMappingURL=file.schema.js.map