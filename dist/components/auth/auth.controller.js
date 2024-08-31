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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const changePassword_dto_1 = require("./dto/changePassword.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    SignInAccount(signInUserDto, ip) {
        return this.authService.findAccount(signInUserDto, ip);
    }
    SignUpAccount(SignupUserDto) {
        return this.authService.createAccount(SignupUserDto);
    }
    DeleteUser(id) {
        return this.authService.DeleteUser(id);
    }
    changePassword(changePasswordDTO) {
        return this.authService.changePassword(changePasswordDTO);
    }
    findAllUser() {
        return this.authService.findAllUser();
    }
    forgotPassword(data) {
        return this.authService.forgotPassword(data);
    }
    terminateAccount(id, bodyData) {
        return this.authService.terminateAccount(id, bodyData);
    }
    getAllLogs() {
        return this.authService.getAllLogs();
    }
    findLog(id) {
        return this.authService.findLog(id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/signIn'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "SignInAccount", null);
__decorate([
    (0, common_1.Post)('/signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignupUserDto]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "SignUpAccount", null);
__decorate([
    (0, common_1.Delete)('/deleteUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "DeleteUser", null);
__decorate([
    (0, common_1.Post)('/changePassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePassword_dto_1.ChangePasswordDTO]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('/findalluser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AuthController.prototype, "findAllUser", null);
__decorate([
    (0, common_1.Post)('/forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Patch)('/terminateUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "terminateAccount", null);
__decorate([
    (0, common_1.Get)('/log/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAllLogs", null);
__decorate([
    (0, common_1.Get)('/log/find/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findLog", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('/v1/auth/'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map