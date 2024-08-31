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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("../../Schema/auth/auth.schema");
const mongoose_2 = require("mongoose");
const generatePassword_1 = require("../../utils/generatePassword");
const sendMail_1 = require("../../utils/sendMail");
const log_schema_1 = require("../../Schema/log/log.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService, logsModel) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.logsModel = logsModel;
    }
    async findAccount(signInUserDto, ip) {
        try {
            const { email, password } = signInUserDto;
            console.log('Access by this IP', ip);
            const user = await this.userModel.findOne({ email: email });
            if (!user) {
                throw new common_1.NotFoundException('Invalid email');
            }
            const isPasswordMatched = await bcrypt.compare(password, user?.password);
            if (!isPasswordMatched) {
                throw new common_1.BadRequestException('Invalid password');
            }
            const token = this.jwtService.sign({ id: user?._id });
            return {
                email: user?.email,
                token,
                user: user?.name,
                isAdmin: user.isAdmin || false,
                status: user?.status,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid Email or Password');
        }
    }
    async createAccount(signupUserDto) {
        try {
            const { email, name, password } = signupUserDto;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await this.userModel.create({
                name,
                email,
                password: hashedPassword,
                isUser: true,
            });
            return {
                message: 'Account Created Sucessfully',
            };
        }
        catch (error) {
            if (error instanceof mongoose_2.Error.ValidationError &&
                error.errors.email.kind === 'unique') {
                throw new common_1.ConflictException('Email address is already in use.');
            }
            throw error;
        }
    }
    async changePassword(changePasswordDTO) {
        try {
            const { email, password } = changePasswordDTO;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            let user = await this.userModel.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } });
            return { message: 'Password Changed Sucessfully!' };
        }
        catch (err) {
            console.log(err);
        }
    }
    async findAllUser() {
        try {
            let user = await this.userModel.find({ isUser: true });
            return { status: true, user: user };
        }
        catch (err) {
            console.log(err);
        }
    }
    async DeleteUser(id) {
        try {
            let user = await this.userModel.findByIdAndDelete(id);
            return { status: true, user: user };
        }
        catch (err) {
            console.log(err);
        }
    }
    async terminateAccount(id, bodyData) {
        try {
            let user = await this.userModel.findOneAndUpdate({ _id: id }, { $set: bodyData }, { returnDocument: 'after' });
            return { status: true, user: user };
        }
        catch (err) {
            console.log(err);
        }
    }
    async forgotPassword(data) {
        try {
            const { email } = data;
            let user = await this.userModel.findOne({ email });
            if (!user) {
                return { status: false, message: 'User Not Found!' };
            }
            const randomPassword = await (0, generatePassword_1.generateRandomPassword)();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(randomPassword, salt);
            await this.userModel.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } });
            await (0, sendMail_1.sendEmail)(email, ' Password Forgot Sucessfully!', ` Your password for Secure FTP Server is: ${randomPassword}. Keep it secure!`);
            await (0, sendMail_1.sendEmail)('satya.tyagi@effectualservices.com', `Password Forgot by ${email}`, `Email : ${email}
        Password: ${randomPassword}`);
            return { status: true, message: 'Password Forgot Sucessfully' };
        }
        catch (err) {
            console.log(err);
        }
    }
    async getAllLogs() {
        try {
            const logs = await this.logsModel.find();
            return logs;
        }
        catch (err) {
            console.log(err);
        }
    }
    async findLog(id) {
        try {
            const logs = await this.logsModel.findOne({ _id: id });
            return logs;
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_schema_1.USER_MODEL)),
    __param(2, (0, mongoose_1.InjectModel)(log_schema_1.LOGS_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map