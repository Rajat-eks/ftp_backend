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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareFileController = void 0;
const common_1 = require("@nestjs/common");
const shareFiles_service_1 = require("./shareFiles.service");
const shareFile_dto_1 = require("./dto/shareFile.dto");
let ShareFileController = class ShareFileController {
    constructor(shareFileService) {
        this.shareFileService = shareFileService;
    }
    shareFile(shareFileDTO, request) {
        const ipAddress = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        return this.shareFileService.shareFile(shareFileDTO, ipAddress);
    }
    verifyFile(token) {
        return this.shareFileService.verifyFile(token);
    }
    verifyOTP(token) {
        return this.shareFileService.verifyOTP(token);
    }
    checkOTPSecurity(token) {
        return this.shareFileService.checkOTPSecurity(token);
    }
    getOTP(token) {
        return this.shareFileService.getOTP(token);
    }
};
exports.ShareFileController = ShareFileController;
__decorate([
    (0, common_1.Post)('/files'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shareFile_dto_1.ShareFileDTO, Object]),
    __metadata("design:returntype", Object)
], ShareFileController.prototype, "shareFile", null);
__decorate([
    (0, common_1.Get)('/verify/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], ShareFileController.prototype, "verifyFile", null);
__decorate([
    (0, common_1.Get)('/verifyOTP/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], ShareFileController.prototype, "verifyOTP", null);
__decorate([
    (0, common_1.Get)('/isOTPSecurity/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], ShareFileController.prototype, "checkOTPSecurity", null);
__decorate([
    (0, common_1.Get)('/getOTP/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], ShareFileController.prototype, "getOTP", null);
exports.ShareFileController = ShareFileController = __decorate([
    (0, common_1.Controller)('/share'),
    __metadata("design:paramtypes", [shareFiles_service_1.ShareFileService])
], ShareFileController);
//# sourceMappingURL=shareFiles.controller.js.map