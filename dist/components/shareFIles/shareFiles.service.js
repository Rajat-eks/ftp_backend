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
exports.ShareFileService = void 0;
const common_1 = require("@nestjs/common");
const sendMail_1 = require("../../utils/sendMail");
const mongoose_1 = require("@nestjs/mongoose");
const shareFile_schema_1 = require("../../Schema/shareFile/shareFile.schema");
const mongoose_2 = require("mongoose");
const crypto_service_1 = require("./crypto.service");
const folder_schema_1 = require("../../Schema/folder/folder.schema");
const generateOTP_1 = require("../../utils/generateOTP");
const log_schema_1 = require("../../Schema/log/log.schema");
let ShareFileService = class ShareFileService {
    constructor(shareFileModel, folderModel, cryptoService, logsModel) {
        this.shareFileModel = shareFileModel;
        this.folderModel = folderModel;
        this.cryptoService = cryptoService;
        this.logsModel = logsModel;
    }
    async shareFile(shareFileDTO, ipAddress) {
        const { email, file, folderID, OTPSecurity, subject, userEmail, isFileShare, isFolderShare, } = shareFileDTO;
        const OTP = (0, generateOTP_1.generateOTP)();
        let { _id, ...data } = await this.shareFileModel.create({
            folderID,
            file,
            shareBy: userEmail,
            shareTo: email,
            OTPSecurity: OTPSecurity,
            isFolderShare,
            isFileShare,
            OTP,
        });
        const id = _id.toString();
        const encryptedText = this.cryptoService.encrypt(id);
        let htmlMessage = OTPSecurity
            ? `<p>Hi,</p>

    <p>You have received  files from ${userEmail}. To access the files, please click the link below:</p>
  
    <p><a href=http://effectual-services.in/authanticate?token=${encryptedText}>Get Files</a></p>

    <p>Your Secured OTP: ${OTP}</p>
  
    <p>Thank you!</p>`
            : `<p>Hi,</p>

    <p>You have received  files from ${userEmail}. To access the files, please click the link below:</p>
  
    <p><a href=http://effectual-services.in/authanticate?token=${encryptedText}>Get Files</a></p>

    <p>Thank you!</p>`;
        (0, sendMail_1.sendEmail)(email, subject, htmlMessage);
        const { folderName, files } = await this.folderModel?.findOne({
            _id: folderID,
        });
        const logs = await this.logsModel.create({
            userEmail: userEmail,
            ip: ipAddress,
            files: isFileShare ? file : files,
            folder: folderName,
            senderEmail: email,
            isDomainSame: false,
            isFolderShare,
            isFileShare,
        });
        return { message: 'File Share Sucessfully' };
    }
    async verifyFile(token) {
        try {
            const decryptedText = await this.cryptoService.decrypt(token);
            if (!decryptedText) {
                return {
                    status: false,
                };
            }
            let targetFolder = await this.shareFileModel.findById(decryptedText);
            if (!targetFolder) {
                return {
                    status: false,
                };
            }
            let folder = await this.folderModel.findById(targetFolder?.folderID);
            if (targetFolder?.isFolderShare) {
                return {
                    files: targetFolder?.file,
                    folder: folder,
                    status: true,
                    isFolderShare: true,
                    isFileShare: false,
                };
            }
            if (targetFolder?.isFileShare) {
                return {
                    files: targetFolder?.file,
                    folder: folder,
                    status: true,
                    isFolderShare: false,
                    isFileShare: true,
                };
            }
        }
        catch (err) {
            return {
                status: false,
            };
        }
    }
    async verifyOTP(token) {
        try {
            const decryptedText = await this.cryptoService.decrypt(token);
            if (!decryptedText) {
                return {
                    status: false,
                };
            }
            let targetFolder = await this.shareFileModel.findById(decryptedText);
            if (!targetFolder) {
                return {
                    status: false,
                };
            }
            const OTP = (0, generateOTP_1.generateOTP)();
            const { shareTo } = targetFolder;
            (0, sendMail_1.sendMultipleEmail)(shareTo, 'Verification Code', `Your Verification code is ${OTP}`);
            return {
                status: true,
                OTP: OTP,
                email: targetFolder?.shareTo,
            };
        }
        catch (err) {
            return {
                status: false,
            };
        }
    }
    async checkOTPSecurity(token) {
        try {
            const decryptedText = await this.cryptoService.decrypt(token);
            if (!decryptedText) {
                return {
                    status: false,
                };
            }
            let targetFolder = await this.shareFileModel.findById(decryptedText);
            if (!targetFolder) {
                return {
                    status: false,
                };
            }
            return {
                status: true,
                OTPSecurity: targetFolder?.OTPSecurity,
            };
        }
        catch (err) {
            return {
                status: false,
            };
        }
    }
    async getOTP(token) {
        try {
            const decryptedText = await this.cryptoService.decrypt(token);
            if (!decryptedText) {
                return {
                    status: false,
                };
            }
            let targetFolder = await this.shareFileModel.findById(decryptedText);
            if (!targetFolder) {
                return {
                    status: false,
                };
            }
            return {
                status: true,
                OTP: targetFolder?.OTP,
            };
        }
        catch (err) {
            return {
                status: false,
            };
        }
    }
};
exports.ShareFileService = ShareFileService;
exports.ShareFileService = ShareFileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(shareFile_schema_1.SHAREFILE_MODEL)),
    __param(1, (0, mongoose_1.InjectModel)(folder_schema_1.FOLDER_MODEL)),
    __param(3, (0, mongoose_1.InjectModel)(log_schema_1.LOGS_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        crypto_service_1.CryptoService,
        mongoose_2.Model])
], ShareFileService);
//# sourceMappingURL=shareFiles.service.js.map