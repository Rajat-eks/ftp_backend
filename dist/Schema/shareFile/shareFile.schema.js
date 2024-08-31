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
exports.SHAREFILE_MODEL = exports.ShareFileSchema = exports.ShareFile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ShareFile = class ShareFile {
};
exports.ShareFile = ShareFile;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShareFile.prototype, "folderID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [] }),
    __metadata("design:type", Object)
], ShareFile.prototype, "file", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShareFile.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShareFile.prototype, "shareBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], ShareFile.prototype, "shareTo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], ShareFile.prototype, "isFolderShare", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], ShareFile.prototype, "isFileShare", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], ShareFile.prototype, "OTPSecurity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShareFile.prototype, "OTP", void 0);
exports.ShareFile = ShareFile = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ShareFile);
exports.ShareFileSchema = mongoose_1.SchemaFactory.createForClass(ShareFile);
exports.SHAREFILE_MODEL = ShareFile.name;
//# sourceMappingURL=shareFile.schema.js.map